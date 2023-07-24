import { useState } from "react";
import wrapper from "store";
import GlobalStyles from "./components/GlobalStyles";
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
  const [modal, setModal] = useState(true);

  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      />
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <CacheProvider value={cache}>
            <GlobalStyles modal={modal} />
            <Hydrate state={pageProps.dehydratedState}>
              <Component {...pageProps} />
              {/* {modal && <BottomSheet type="primary" visible={true} />} */}
            </Hydrate>
          </CacheProvider>
        </Provider>
      </QueryClientProvider>
    </>
  );
};

export default App;
