import styled from '@emotion/styled';

export const SkeletonBig = () => {
  return (
    <div role="status" className="max-w-sm rounded shadow animate-pulse dark:border-gray-300">
      <BigContainer className="flex bg-gray-300 dark:bg-gray-300">
        <Content>
          <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-500 w-40"></div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-500"></div>
        </Content>
      </BigContainer>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export const SkeletonMedium = () => {
  return (
    <div role="status" className="max-w-sm rounded shadow animate-pulse dark:border-gray-300">
      <MidContainer className="flex bg-gray-300 dark:bg-gray-300">
        <Content>
          <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-500 w-40"></div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-500"></div>
        </Content>
      </MidContainer>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export const SkeletonSmall = () => {
  return (
    <Content role="status" className="max-w-sm rounded shadow animate-pulse dark:border-gray-300">
      <SmallContainer className="flex bg-gray-300 dark:bg-gray-300" />
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-500 w-20"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-500"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-500"></div>
      <span className="sr-only">Loading...</span>
    </Content>
  );
};

const BigContainer = styled.div`
  width: 100%;
  padding: calc(424 / 327 * 100%) 22px 22px 22px;

  border-radius: 1rem;
`;

const MidContainer = styled.div`
  width: 100%;
  padding: calc(156 / 327 * 100%) 22px 22px 22px;
  border-radius: 1rem;
`;

const SmallContainer = styled.div`
  width: 100%;
  min-width: 150px;
  padding: calc(230 / 158 * 100%) 12px 12px 0;
  border-radius: 1rem;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;
