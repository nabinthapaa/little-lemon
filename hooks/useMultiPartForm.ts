import { ReactElement, useState } from "react";

export function useMultiPartForm(forms: ReactElement[]) {
  const [currentFormIndex, setCurrentFormIndex] = useState(0);

  function next() {
    setCurrentFormIndex((prev) => {
      if (prev < forms.length) {
        return prev + 1;
      } else {
        return prev;
      }
    });
  }

  function back() {
    setCurrentFormIndex((prev) => {
      if (prev > 0) {
        return prev - 1;
      } else {
        return prev;
      }
    });
  }

  function goTo(index: number) {
    setCurrentFormIndex((prev) => {
      if (index < 0 || index > forms.length) {
        return prev;
      } else {
        return index;
      }
    });
  }

  return {
    currentFormIndex,
    isLast: currentFormIndex === forms.length - 1,
    isFirst: currentFormIndex === 0,
    forms,
    form: forms[currentFormIndex],
    goTo,
    next,
    back,
  };
}
