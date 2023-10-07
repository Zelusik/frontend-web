import { useEffect, useState } from "react";
import wrapper from "store";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { cache } from "@emotion/css";
import { CacheProvider } from "@emotion/react";

import { useAppSelector } from "hooks/useReduxHooks";
import useBottomSheet from "hooks/useBottomSheet";
import useSearch from "hooks/useSearch";

import { ThemeProvider } from "@material-ui/core";
import { createTheme } from "@mui/material/styles";

import { MantineProvider } from "@mantine/core";
// import { NotificationsProvider } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import "@mantine/core/styles.css";

import BottomSheet from "components/BottomSheet";
import Alert from "components/Alert";

import GlobalStyles from "./components/GlobalStyles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
  },
});

const App = ({ Component, ...rest }: AppProps) => {
  const {
    store,
    props: { pageProps },
  } = wrapper.useWrappedStore(rest);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MantineProvider
            // withGlobalStyles
            // withNormalizeCSS
            theme={{
              // globalStyles(theme: any) {
              //   return {
              //     a: {
              //       textDecoration: "none",
              //     },
              //   };
              // },
              defaultRadius: 8,
              components: {
                TextInput: {
                  defaultProps: {
                    placeholder: "입력해주세요",
                  },
                },
                Select: {
                  defaultProps: {
                    placeholder: "선택",
                  },
                },
                DatePicker: {
                  defaultProps: {
                    placeholder: "2023.01.01",
                    locale: "ko",
                    inputFormat: "YYYY.MM.DD",
                  },
                },
                DateRangePicker: {
                  defaultProps: {
                    placeholder: "2023.01.01 ~ 2024.01.01",
                    locale: "ko",
                    inputFormat: "YYYY.MM.DD",
                  },
                },
                Textarea: {
                  defaultProps: {
                    placeholder: "입력해주세요",
                  },
                },
              },
            }}
          >
            {/* <NotificationsProvider position="top-center" zIndex={6000}> */}
            <ModalsProvider>
              <MyApp Component={Component} pageProps={pageProps} />
            </ModalsProvider>
            {/* </NotificationsProvider> */}
          </MantineProvider>
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  );
};

const MyApp = ({ Component, pageProps }: any) => {
  const { visible: bottomSheetVisible } = useAppSelector(
    (state) => state.bottomSheet
  );
  const { visible: alertVisible } = useAppSelector((state) => state.alert);
  const { visible: searchPlaceVisible } = useAppSelector(
    (state) => state.search
  );
  const { closeBottomSheetQuick } = useBottomSheet({});
  const { closeSearchPlace } = useSearch();
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

  const goBack = () => {
    const pathname = location.pathname;
    if (pathname === "/search-modal") {
      closeSearchPlace();
    } else if (bottomSheetVisible === 1) {
      closeBottomSheetQuick(true);
    }
  };

  useEffect(() => {
    window.addEventListener("popstate", goBack);
    return () => {
      window.removeEventListener("popstate", goBack);
    };
  }, [bottomSheetVisible, searchPlaceVisible]);

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
        {bottomSheetVisible ? <BottomSheet /> : null}
        {alertVisible ? <Alert /> : null}
      </Hydrate>
    </CacheProvider>
  );
};

export default App;
