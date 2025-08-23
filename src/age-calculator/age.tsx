import { useState } from "react";
import "./styles.css";

type FormKeys = "year" | "month" | "day";

interface field {
  label: string;
  name: FormKeys;
  min: number;
  max: number;
  placeHolder: string;
}

export default function AgeCalculator() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<Record<FormKeys, string>>({
    year: "",
    month: "",
    day: "",
  });
  const [error, setError] = useState<Partial<Record<FormKeys, string>>>({});
  const [result, setResult] = useState<{
    years: number | string;
    months: number | string;
    days: number | string;
  }>({
    years: "--",
    months: "--",
    days: "--",
  });

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  const formData: field[] = [
    { label: "Day", name: "day", placeHolder: "DD", min: 1, max: 31 },
    { label: "Month", name: "month", placeHolder: "MM", min: 1, max: 12 },
    {
      label: "Year",
      name: "year",
      placeHolder: "YYYY",
      min: 1990,
      max: currentYear,
    },
  ];

  const isLeapYear = (year: number) =>
    (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  const getMaxDays = (month: number, year: number) => {
    const daysInMonth: Record<number, number> = {
      1: 31,
      2: isLeapYear(year) ? 29 : 28,
      3: 31,
      4: 30,
      5: 31,
      6: 30,
      7: 31,
      8: 31,
      9: 30,
      10: 31,
      11: 30,
      12: 31,
    };
    return daysInMonth[month] || 31;
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (!/^\d*$/.test(value)) return;

    setForm((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: "" }));
  }

  function handleForm() {
    const newErrors: Partial<Record<FormKeys, string>> = {};

    formData.forEach(({ name, min, max }) => {
      const value = form[name];
      if (!value) {
        newErrors[name] = "field is required";
        return;
      }

      const numValue = Number(value);
      if (isNaN(numValue)) {
        newErrors[name] = "Must be a number";
        return;
      }

      if (name === "day") {
        const monthNum = Number(form.month);
        const yearNum = Number(form.year);
        if (monthNum && yearNum) {
          const maxDay = getMaxDays(monthNum, yearNum);
          if (numValue < 1 || numValue > maxDay)
            newErrors[name] = `Must be a valid day`;
        }
      }

      if (name === "month" && (numValue < 1 || numValue > 12)) {
        newErrors[name] = "Must be a valid month";
      }

      if (name === "year" && (numValue < 1990 || numValue > currentYear)) {
        newErrors[name] = "Must be in the past";
      }
    });

    return newErrors;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationErrors = handleForm();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    const dayNum = Number(form.day);
    const monthNum = Number(form.month);
    const yearNum = Number(form.year);

    setResult({
      years: currentYear - yearNum,
      months: currentMonth - monthNum,
      days: currentDay - dayNum,
    });

    setError({});
    setSubmitted(true);
  }

  return (
    <div className="grid bg-white w-[92vw] md:w-[700px] h-auto rounded-3xl rounded-br-[7.8rem] px-10">
      <form onSubmit={handleSubmit} noValidate>
        <div className="flex w-full mt-10 gap-4 md:w-[500px]">
          {formData.map((field) => (
            <div key={field.name} className="flex flex-col">
              <label
                className={`font-bold text-[0.8rem] tracking-[0.2rem] uppercase ${
                  error[field.name]
                    ? "text-[hsl(0,100%,67%)]"
                    : "text-[hsl(0,1%,44%)]"
                }`}
              >
                {field.label}
              </label>
              <input
                type="number"
                name={field.name}
                min={field.min}
                max={field.max}
                placeholder={field.placeHolder}
                value={form[field.name]}
                onChange={handleChange}
                className={`md:w-[135px] w-[100%] font-bold text-[1.3rem] border-[1.5px] border-[hsl(0,0%,86%)] rounded-[8px] px-[0.6rem] py-[0.75rem]${
                  error[field.name] ? "border-[hsl(0,100%,67%)]" : ""
                }`}
              />
              {error[field.name] && (
                <p className="error-empty text-[0.6rem] font-[400] mt-[0.5rem] leading-[0.8rem] text-[hsl(0,100%,67%)]">
                  {error[field.name]}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="grid w-full mt-16">
          <hr className="z-1" />
          <button
            type="submit"
            className="bg-[hsl(259,100%,65%)] rounded-[50%] w-16 md:w-[90px] md:h-[90px] h-16 justify-self-center md:justify-self-end z-2 absolute top-[18.3rem] md:top[17rem] "
          >
            <img
              src="age-assets/images/icon-arrow.svg"
              alt="submit arrow"
              className="m-auto w-8 md:w-12"
            />
          </button>
        </div>
      </form>

      <section className="w-full mt-16 mb-12 font-bold italic leading-[4rem] text-[4rem] md:text[5rem]">
        <div>
          <span>{submitted ? result.years : "--"}</span> years
        </div>
        <div>
          <span>{submitted ? result.months : "--"} </span>months
        </div>
        <div>
          <span>{submitted ? result.days : "--"}</span> days
        </div>
      </section>
    </div>
  );
}
