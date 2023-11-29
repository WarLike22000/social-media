import React from 'react';
import { Select } from 'antd';
import { IoIosArrowDown } from "react-icons/io";
  
  type CountrySelectValue = {
    flag: string;
    label: string;
    latlng: number[];
    region: string;
    value: string;
}

  interface CountrySelectProps {
    value?: CountrySelectValue[]
    onChange: (value: CountrySelectValue) => void;
    isLoading: boolean;
  }
  
const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange,
  isLoading
}) => {

  // Filter `option.label` match the user type `input`
  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  
  return (
    <Select
      showSearch
      className="font-vazir font-bold"
      placeholder="کشور خود را انتخاب کنید"
      suffixIcon={<IoIosArrowDown size={16} className="text-[#1f1f22]" />}
      optionFilterProp="children"
      onChange={(value) => onChange(value)}
      filterOption={filterOption}
      options={value}
      disabled={isLoading}
    />
  )
};

export default CountrySelect;