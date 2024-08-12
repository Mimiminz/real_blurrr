import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { MdAddPhotoAlternate } from "react-icons/md";
import axios from "axios";
import { submitImageForOCR } from '@/api/carcertification'

interface SimilarCar {
  brand: string;
  series: string;
  model_detail: string;
}

const CarCertificationForm = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [ocrResults, setOcrResults] = useState<{ vehicle_model: string | null, preprocessed_image: string | null, similar_car: SimilarCar | null }>({ vehicle_model: null, preprocessed_image: null, similar_car: null });
  const [loading, setLoading] = useState<boolean>(false);
  const [preprocessedImage, setPreprocessedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [videoStream]);

  const handleCaptureClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setVideoStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error("새로고침을 해주세요.", error);
    }
  };

  const handleVideoClick = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0);

      setImageSrc(canvas.toDataURL("image/png"));

      videoRef.current.pause();
      videoRef.current.srcObject = null;
      if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop());
      }
      setVideoStream(null);
    }
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!imageSrc) return;

    try {
        const result = await submitImageForOCR(imageSrc);
        console.log("OCR 결과: ", result);
        if (result && result.extracted_texts) {
          setOcrResults({
            vehicle_model: result.vehicleModel || null, 
            preprocessed_image: result.preprocessed_image || null,
            similar_car: result.similar_car || null,
          });
          console.log("OCR 결과 상태:", ocrResults);

        } else {
          console.error("OCR 결과가 없습니다:", result);
        }
      } catch (error) {
        console.error("Error submitting image:", error);
      } finally {
        setLoading(false);
      }
  };

  const handleConfirm = () => {
    alert("🎉내 차량이 등록되었습니다🎉")
    // router.push("/")

  };

  const handleDecline = () => {
    alert("관리자가 차량 확인 후 차량 재등록을 해드릴게요.")
    // router.push("/")

  };

  return (
    <Container>
      <Head>
        <Heading>자동차 등록증 업로드</Heading>
        <SubHeading>내 차 인증하고 다양한 서비스를 이용해보세요!</SubHeading>
        <SubSubHeading>
          * 자동차 등록증은 사용자 차량 확인 후 폐기될 예정입니다.
        </SubSubHeading>
      </Head>
      <Body>
        
        <CaptureButton onClick={handleCaptureClick}>자동차 등록증 촬영하기</CaptureButton>
        <ImageBox
          onClick={() => document.getElementById("uploadImage")?.click()}
        >
          {videoStream ? (
            <Video ref={videoRef} autoPlay onClick={handleVideoClick} />
          ) : imageSrc ? (
            <Image src={imageSrc} alt="자동차 등록증 이미지 업로드" />
          ) : (
            <Placeholder><MdAddPhotoAlternate/></Placeholder>
            
          )}
        </ImageBox>
        <SubmitButtonContainer>
       <SubmitButton onClick={handleSubmit}>제출</SubmitButton>
      </SubmitButtonContainer>
      </Body>
      <input
        type="file"
        id="uploadImage"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />

      {loading && (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      )}
       {ocrResults.similar_car && (
          <CarInfoContainer>
            <Div>
              차량 브랜드: {ocrResults.similar_car.brand}
            </Div>
            <Div>
              차량 모델: {ocrResults.similar_car.series} 
            </Div>
            <Owner>
              {ocrResults.similar_car.model_detail} 오너
            </Owner>
            <Question>내 차량이 맞나요?</Question>
            <ConfirmationContainer>
              <ConfirmationButtonContainer>
                <ConfirmationButton onClick={handleConfirm}>예</ConfirmationButton>
                <ConfirmationButton onClick={handleDecline}>아니오</ConfirmationButton>
              </ConfirmationButtonContainer>
            </ConfirmationContainer>
          </CarInfoContainer>
          
        )}
        <ConfirmationContainer>
          <ConfirmationButtonContainer>
            <Button onClick={() => router.push("/")}>다음에 할게요.</Button>
          </ConfirmationButtonContainer>
        </ConfirmationContainer>
      
    </Container>
  );
};

export default CarCertificationForm;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  width: 400px;
  height: 100%;
  margin: 20px;
  padding: 50px;
  background-color: #f0f0f0;
  gap: 30px;
  border-radius: 15px;
`;

const Head = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;
`;


const Body = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  gap: 20px;
`;

const Heading = styled.h2`
  margin: 5px 0;
`;

const SubHeading = styled.h4`
  margin: 5px 0;
`;

const SubSubHeading = styled.h6`
  margin: 5px 0;
`;

const SubmitButtonContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  width: 100%;
`
const SubmitButton = styled.button`
  font-size: 1em;
  padding: 10px 20px;
  font-weight: 400;
  color: #fff;
  background-color: #007BFF; 
  border: none; 
  border-radius: 8px; 
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #0056b3;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3); 
  }

  &:disabled {
    background-color: #cccccc; 
    color: #666666;
    cursor: not-allowed; 
    box-shadow: none;
  }
`

const CaptureButton = styled.button`
  font-size: 1em;
  padding: 10px 20px;
  font-weight: 400;
  color: #fff;
  background-color: #007BFF; 
  border: none; 
  border-radius: 8px; 
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #0056b3;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3); 
  }

  &:disabled {
    background-color: #cccccc; 
    color: #666666;
    cursor: not-allowed; 
    box-shadow: none;
  }
`


const Button = styled.button`
  font-size: 1em;
  padding: 10px;
  color: #000000;
  border: none;
  text-decoration: underline;
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
  border: 2px dashed #ccc;
  cursor: pointer;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const Video = styled.video`
  max-width: 100%;
  max-height: 100%;
`;

const Placeholder = styled.span`
  color:#ccc;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
`;

const ResultsContainer = styled.div`
  display: flex;
  margin-top: 10px;
  text-align: left;
`;

const Div = styled.div`
  display: block;
  font-weight: 700;
  margin-bottom: 10px;
  font-size: 1em; 
  color: #000000; 
`;

const Owner = styled.div`
  display: block;
  font-weight: 700;
  margin-top: 20px;
  font-size: 1em; 
  color: #000000; 
`;

const CarInfoContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1); 
  border-left: 4px solid #007BFF; 
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ConfirmationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Question = styled.h4`
  font-weight: bold;
`;

const ConfirmationButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const ConfirmationButton = styled.button`
  font-size: 1em;
  width:100px;
  padding: 10px 20px;
  font-weight: 400;
  color: #fff;
  background-color: ${props => props.children === '예' ? '#007BFF' : '#007BFF'}; /* 파란색 또는 빨간색 */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: ${props => props.children === '예' ? '#0056b3' : '#0056b3'}; /* 어두운 파란색 또는 어두운 빨간색 */
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  }
`;
