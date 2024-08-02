import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

interface BreadcrumbProps {
  channel: string;
  subChannel: string;
  channelUrl: string;
  subChannelUrl: string; // subChannelUrl 추가
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

    &:hover {
      text-decoration: underline;
    }
  }

  span, .breadcrumb-link {
    color: ${({ theme }) => theme.colors.main};
    margin-right: 5px;

    &:before {
      content: '>';
      margin-right: 5px;
      color: #888;
    }
  }
`;

const Breadcrumb: React.FC<BreadcrumbProps> = ({ channel, subChannel, channelUrl, subChannelUrl }) => {
  return (
    <BreadcrumbContainer>
      <Link href={channelUrl} legacyBehavior>
        <a>{channel}</a>
      </Link>
      <Link href={subChannelUrl} legacyBehavior>
        <a className="breadcrumb-link">{subChannel}</a>
      </Link>
    </BreadcrumbContainer>
  );
};

export default Breadcrumb;
