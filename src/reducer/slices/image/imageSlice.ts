import { createSlice } from "@reduxjs/toolkit";
import { ImageType, MenuTagType } from "@/types/image";

// 이미지를 보여줄 path, 위도 경도 등을 저장할 slice
const initialState: ImageType[] = [];

export const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    initializeImageInfo: () => initialState,
    changeImageInfo: (state, { payload }: { payload: ImageType }) => {
      state.push(payload);
    },
    // 리뷰 수정 시
    initEditImageInfo: (state, { payload }: { payload: ImageType[] }) => {
      return [...payload];
    },
    appendMenuTag: (
      state,
      {
        payload,
      }: {
        payload: ImageType & {
          index: number;
          menuTag: MenuTagType;
        };
      }
    ) => {
      const { index, menuTag } = payload;
      if (!state[index].menuTag) {
        state[index].menuTag = [];
      }
      state[index].menuTag.push(menuTag);
    },
    deleteMenuTag: (
      state,
      {
        payload,
      }: {
        payload: ImageType & {
          index: number;
          menuTag: MenuTagType;
        };
      }
    ) => {
      const { index, menuTag } = payload;
      state[index].menuTag = state[index].menuTag.filter(
        (tag: any) =>
          !(
            tag.x === menuTag.x &&
            tag.y === menuTag.y &&
            tag.menu === menuTag.menu
          )
      );
    },
    modifyMenuTag: (
      state,
      {
        payload,
      }: {
        payload: ImageType & {
          index: number;
          prevMenuTag: MenuTagType;
          currMenuTag: MenuTagType;
        };
      }
    ) => {
      const { index, prevMenuTag, currMenuTag } = payload;
      state[index].menuTag = state[index].menuTag.map((tag: any) => {
        if (
          tag.x === prevMenuTag.x &&
          tag.y === prevMenuTag.y &&
          tag.menu === prevMenuTag.menu
        ) {
          return currMenuTag;
        } else {
          return tag;
        }
      });
    },
  },
});

export const {
  initializeImageInfo,
  changeImageInfo,
  initEditImageInfo,
  appendMenuTag,
  deleteMenuTag,
  modifyMenuTag,
} = imageSlice.actions;

export default imageSlice.reducer;
