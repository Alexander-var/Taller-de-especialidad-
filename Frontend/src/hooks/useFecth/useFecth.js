import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    hasError: null,
  });

  const getFetch = async () => {
    setState({
      ...state,
      isLoading: true,
    });

    const resp = await fetch(url, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tYnJlIjoiSm9obiIsInVzdWFyaW8iOiJEaXJlYyIsImNvcnJlbyI6ImpvaG5jZW5hQGdtYWlsLmNvbSIsInJvbCI6MSwiaWF0IjoxNjU3MTM1MTQ5LCJleHAiOjE2NTcxNDk1NDl9.h9gXsCiwxPGG-VVEl3eCQL7pdaJUm2dZU5Ecn7aIMCg`,
      },
    });
    const data = await resp.json();

    setState({
      data,
      isLoading: false,
      hasError: null,
    });
  };

  useEffect(() => {
    getFetch();
  }, [url]);

  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
  };
};
