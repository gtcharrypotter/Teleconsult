import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";


const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleNetworkChange = (state) => {
      setIsOnline(state.isConnected);
    //   if (!state.isConnected) {
    //     ToastAndroid.show("No internet connection!", ToastAndroid.SHORT);
    //   } else {
    //     ToastAndroid.show("Internet connection restored!", ToastAndroid.SHORT);
    //   }
    };

    // Subscribe to network status changes
    const unsubscribe = NetInfo.addEventListener(handleNetworkChange);

    // Check initial network status
    NetInfo.fetch().then(handleNetworkChange);

    return () => unsubscribe();
  }, []);

  return { isOnline };
};

export default useNetworkStatus;