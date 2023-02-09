import styled from '@emotion/styled';
import { ChangeEventHandler, MouseEventHandler } from 'react';

import { useRouter } from 'next/router';

import COLOR from '../../../constants/theme';
import FONT from '../../../constants/fonts';

import { GoBackIcon, DelIcon } from '../../icons/BtnIcons';
import { propsType } from '../../../interfaces/main';

export const InputSearch = (props: { onClick: MouseEventHandler<HTMLInputElement> | undefined }) => {
  return (
    <Input
      placeholder="재료 검색어를 입력해 주세요"
      css={FONT.BODY_2_3}
      onClick={props.onClick}
      isSearching={false}
      readOnly
    />
  );
};

export const InputSearchItem = (props: propsType) => {
  const router = useRouter();
  return (
    <>
      <GoBackIcon onClick={() => router.back()} color={COLOR.PRIMARY_BLACK} />
      <Input
        id="search"
        placeholder="검색어 입력"
        css={FONT.BODY_2_3}
        value={props.value}
        onChange={props.onChange}
        isSearching={true}
        autoFocus
      />
      <IconWrapper onClick={props.reset}>
        <DelIcon />
      </IconWrapper>
    </>
  );
};

const Input = styled.input<{ isSearching: boolean }>`
  width: 100%;
  padding: 10px 10px 10px 16px;
  margin-left: ${(props) => props.isSearching && '0.75rem'};

  border-radius: 8px;
  background: ${COLOR.PRIMARY_GRAY2};
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 2.5rem;

  display: flex;
  justify-content: center;
`;
