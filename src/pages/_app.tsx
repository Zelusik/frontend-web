import wrapper from "@/store";
import GlobalStyles from "@/styles/global";
import { cache } from "@emotion/css";
import { CacheProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";

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
        <CacheProvider value={cache}>
          <GlobalStyles />
          <Hydrate state={pageProps.dehydratedState}>
            <Provider store={store}>
              <Component {...pageProps} />
            </Provider>
          </Hydrate>
        </CacheProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
