/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import wrapper from "store";
import GlobalStyles from "./components/GlobalStyles";
import { cache } from "@emotion/css";
import { CacheProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { useAppSelector } from "hooks/useReduxHooks";
import BottomSheet from "components/BottomSheet";
import Script from "next/script";

const NEXT_PUBLIC_KAKAO_APP_JS_KEY = "91ce271bfa0a93ac384a49249667fb36";
const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${NEXT_PUBLIC_KAKAO_APP_JS_KEY}&autoload=false`;

const App = ({ Component, ...rest }: AppProps) => {
  const {
    store,
    props: { pageProps },
  } = wrapper.useWrappedStore(rest);
  const queryClient = new QueryClient();

  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      />
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <MyApp Component={Component} pageProps={pageProps} />
        </Provider>
      </QueryClientProvider>
    </>
  );
};

const MyApp = ({ Component, pageProps }: any) => {
  const { visible } = useAppSelector((state) => state.bottomSheet);

  return (
    <CacheProvider value={cache}>
      <GlobalStyles />
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
        {visible ? <BottomSheet /> : null}
      </Hydrate>
    </CacheProvider>
  );
};

export default App;
