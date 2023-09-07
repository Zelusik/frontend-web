import wrapper from "store";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { cache } from "@emotion/css";
import { CacheProvider } from "@emotion/react";
import { useAppDispatch, useAppSelector } from "hooks/useReduxHooks";

import BottomSheet from "components/BottomSheet";
import Alert from "components/Alert";

import GlobalStyles from "./components/GlobalStyles";
import { useEffect } from "react";
import useBottomSheet from "hooks/useBottomSheet";

const App = ({ Component, ...rest }: AppProps) => {
  const {
    store,
    props: { pageProps },
  } = wrapper.useWrappedStore(rest);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <MyApp Component={Component} pageProps={pageProps} />
      </Provider>
    </QueryClientProvider>
  );
};

const MyApp = ({ Component, pageProps }: any) => {
  const { visible } = useAppSelector((state) => state.bottomSheet);
  const { visible: alertVisible } = useAppSelector((state) => state.alert);
  const { closeBottomSheetQuick } = useBottomSheet({});

  const goBack = () => {
    closeBottomSheetQuick(true);
  };

  useEffect(() => {
    if (visible === 1) {
      window.addEventListener("popstate", goBack);
      return () => {
        window.removeEventListener("popstate", goBack);
      };
    }
  }, [visible]);

  return (
    <CacheProvider value={cache}>
      <GlobalStyles />
      <Head>
        <title>Eatery</title>
      </Head>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
        {visible ? <BottomSheet /> : null}
        {alertVisible ? <Alert /> : null}
      </Hydrate>
    </CacheProvider>
  );
};

export default App;
