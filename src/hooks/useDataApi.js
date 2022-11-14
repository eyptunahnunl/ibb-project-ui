import { useState, useEffect } from 'react';

const useDataApi = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const makeAPICall = async () => {
          try {
            const res = await fetch(url);
            const json = await res.json();
            setData([json.data]);
            isLoading(false)     
          } catch (err) {
            console.log('err', err);
          }
    };
    makeAPICall();
  }, [url]);

  return [{ data, isLoading }, setUrl];
};

export default useDataApi;