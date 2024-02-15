import { createContext, ReactNode, useState } from 'react';

interface ErrorContextType {
  errors: string[];
  setErrors: (errors: string[]) => void;
  clearErrors: () => void;
}

export const ErrorContext = createContext<ErrorContextType>({
  errors: [],
  setErrors: () => {},
  clearErrors: () => {},
});

interface Props {
  children: ReactNode;
}

export const ErrorProvider = ({ children }: Props) => {
  const [errors, setErrors] = useState<string[]>([]);


  const clearErrors = () => {
    setErrors([]);
  };

  return (
    <ErrorContext.Provider value={{ errors, setErrors , clearErrors}}>
      {children}
    </ErrorContext.Provider>
  );
};
