import { forwardRef, useState } from "react";
import wrapper from "store";
import GlobalStyles from "./components/GlobalStyles";
import { cache } from "@emotion/css";
import { CacheProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { useAppSelector } from "hooks/useReduxHooks";
import BottomSheet from "components/BottomSheet";

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
        {visible && <BottomSheet />}
      </Hydrate>
    </CacheProvider>
  );
};

export default App;
