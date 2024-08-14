import React from "react";
import styled from "styled-components";
import Link from "next/link";

interface BreadcrumbProps {
  channel?: string;
  subChannel: string;
  channelUrl: string;
  subChannelUrl?: string; // subChannelUrl 추가
}

const BreadcrumbContainer = styled.nav`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #888;
  margin-bottom: 20px;

  a {
    color: inherit;
    text-decoration: none;
    margin-right: 5px;

    /* &:hover {
      text-decoration: underline;
    } */
  }

  span,
  .breadcrumb-link {
    color: ${({ theme }) => theme.colors.main};
    margin-right: 5px;


  }
`;

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  channel = "채널",
  subChannel,
  channelUrl,
  subChannelUrl,
}) => {

  return (
    <BreadcrumbContainer>
      <Link href={channelUrl}>
        {channel}
      </Link>
      <span>&gt;</span>
      {channel === "리그" || !subChannelUrl ? (
        <span className="breadcrumb-link">{subChannel}</span>
      ) : (
        <Link href={subChannelUrl}>
          {subChannel}
        </Link>
      )}
    </BreadcrumbContainer>
  );
};

export default Breadcrumb;
