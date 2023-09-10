import wrapper from "store";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { cache } from "@emotion/css";
import { CacheProvider } from "@emotion/react";
import { useAppSelector } from "hooks/useReduxHooks";

import BottomSheet from "components/BottomSheet";
import Alert from "components/Alert";

import GlobalStyles from "./components/GlobalStyles";
import { useEffect, useState } from "react";
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
  // const { closeBottomSheetQuick } = useBottomSheet({});
  const [isProductionURL, setIsProductionURL] = useState(false);

  useEffect(() => {
    if (typeof window !== undefined) {
      const PROD_URL = process.env.PROD_URL as string;

      const isProductionURL = window.location.href.includes(PROD_URL);
      if (isProductionURL) {
        setIsProductionURL(true);
      }
    }
  }, []);

  // const goBack = () => {
  //   closeBottomSheetQuick(true);
  // };

  // useEffect(() => {
  //   if (visible === 1) {
  //     window.addEventListener("popstate", goBack);
  //     return () => {
  //       window.removeEventListener("popstate", goBack);
  //     };
  //   }
  // }, [visible]);

  return (
    <CacheProvider value={cache}>
      <GlobalStyles />
      <Head>
        <title>Eatery</title>
        {isProductionURL && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:3448838,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `,
            }}
          />
        )}
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
