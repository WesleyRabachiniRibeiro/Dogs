import { PHOTO_POST } from "../Api";
import createAsyncSlice from "./helper/createAsyncSlice";

const slice = createAsyncSlice({
  name: "photoPost",
  reducers: {
    resetState(state) {
      state.data = null;
      state.error = null;
      state.loading = false;
    },
  },
  fetchConfig: ({ formData, token }) => PHOTO_POST(formData, token),
});

export const { resetState: resetPhotoPostState } = slice.actions;

export const photoPost = slice.asyncAction;

export default slice.reducer;
