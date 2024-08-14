import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { MdAddPhotoAlternate } from "react-icons/md";
import axios from "axios";
import { submitImageForOCR } from '@/api/carcertification'
import { carInfo, getUserInfo } from "@/api/mypage";
import { useAuthStore } from "@/store/authStore";
import { fetchUserLeagueList } from "@/api/league";
import { LeagueList, UserLeague } from "@/types/leagueTypes";
import { useLeagueStore } from "@/store/leagueStore";
import { FaCar } from "react-icons/fa";

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
  const [error, setError] = useState<string | null>(null);
  const [preprocessedImage, setPreprocessedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const router = useRouter();
  const { accessToken } = useAuthStore();
  const { setAccessToken, setRefreshToken, setUser } = useAuthStore((state) => ({
    setAccessToken: state.setAccessToken,
    setRefreshToken: state.setRefreshToken,
    setUser: state.setUser,
  }));
  const { setInitialized, setUserLeagueList } = useLeagueStore();

  useEffect(() => {
    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [videoStream]);


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

    setLoading(true);
    setError(null);

    try {
      const result = await submitImageForOCR(imageSrc);

      if (result && result.extracted_texts) {
        setOcrResults({
          vehicle_model: result.vehicle_model || null,
          preprocessed_image: result.preprocessed_image || null,
          similar_car: result.similar_car || null,
        });
      }
      
      const userResponse = await getUserInfo();
      setUser(userResponse);

      if (userResponse.isAuth) {
        const userLeagues: UserLeague[] = await fetchUserLeagueList();
        const userTabs: LeagueList[] = userLeagues.map((userLeague) => ({
          id: userLeague.league.id,
          name: userLeague.league.name,
          type: userLeague.league.type,
          peopleCount: userLeague.league.peopleCount,
        }));

        setUserLeagueList(userTabs);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.detail || "서버 오류가 발생했습니다. 나중에 다시 시도해 주세요.";
        setError(errorMessage);
      } else {
        setError("알 수 없는 오류가 발생했습니다. 나중에 다시 시도해 주세요.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (ocrResults.similar_car && accessToken) {
      try {
        const { brand, series, model_detail } = ocrResults.similar_car;

        const success = await carInfo(brand, series, model_detail, accessToken);

        if (success) {
          const updatedUserInfo = await getUserInfo();
          useAuthStore.getState().setUser(updatedUserInfo);

          const userLeagues = await fetchUserLeagueList();
          const userTabs = userLeagues.map((userLeague) => ({
            id: userLeague.league.id,
            name: userLeague.league.name,
            type: userLeague.league.type,
            peopleCount: userLeague.league.peopleCount,
          }));

          useLeagueStore.getState().setUserLeagueList(userTabs);

          alert("🎉내 차량이 등록되었습니다🎉");
          router.push("/");
        } else {
          alert("차량 등록에 실패했습니다.");
        }
      } catch (error) {
        console.error("Error registering car:", error);
        alert("차량 등록 중 오류가 발생했습니다.");
      }
    } else {
      alert("차량 정보가 없거나 로그인되지 않았습니다.");
    }
  };
  const handleDecline = () => {
    alert("관리자가 차량 확인 후 차량 재등록을 해드릴게요.")
    window.open("https://docs.google.com/forms/d/e/1FAIpQLSclf6QxZWK4E6beV_Q0iHMN4-YTqE7sXo5n3Dt0GgkCttHfPg/viewform?usp=sf_link");
    router.push("/")
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
      {error && <ErrorMessage>{error}</ErrorMessage>}
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
            <CarContainer>
              
              <CarDiv>
               <FaCar color = "#F9803A"/>브랜드
              </CarDiv>
              <Div>
                 {ocrResults.similar_car.brand}
              </Div>
              <CarDiv>
              <FaCar color = "#F9803A" />모델
              </CarDiv>
              <Div>
                 {ocrResults.similar_car.series} 
              </Div>
            </CarContainer>
            <Owner>
              {ocrResults.similar_car.model_detail} 오너가 맞나요?
            </Owner>
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
const SubmitButton = styled.div`
  font-size: 1em;
  padding: 10px 20px;
  font-weight: 400;
  color: #fff;
  background-color: #007BFF; 
  border: none; 
  border-radius: 8px; 
  cursor: pointer;

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
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: 600; 
  font-size: 1em;
  margin-right: 10px;
  border-radius: 50px;
  padding:10px;
  color: #000000; 
`;

const CarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

`

const CarDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px;
  gap: 8px;
  border-radius: 15px;
  font-weight: 600;
  color: #F9803A;
  background-color: white;
`

const Owner = styled.div`
  display: block;
  font-weight: 700;
  margin-top: 20px;
  font-size: 1em; 
  color: #000000; 
  margin-bottom: 30px;
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

const ConfirmationButton = styled.div`
  font-size: 1em;
  width:100px;
  padding: 10px 20px;
  font-weight: 400;
  color: #fff;
  background-color: ${props => props.children === '예' ? '#007BFF' : '#007BFF'};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: ${props => props.children === '예' ? '#0056b3' : '#0056b3'}; 
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  }
`;

const ErrorMessage = styled.div`
  color: #ff4d4d;
  font-size: 1em;
  font-weight: bold;
  margin-top: 10px;
`;