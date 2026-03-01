"use client";
import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  TextField,
  MenuItem,
  IconButton,
  InputAdornment,
  Autocomplete,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface OptionType {
  value: string;
  label: string;
}

interface CustomInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?:
    | "text"
    | "password"
    | "select"
    | "textarea"
    | "autocomplete"
    | "email"
    | "file";
  rules?: object;
  className?: string;
  options?: OptionType[];
  icon?: React.ReactNode;
}

const CustomInput: React.FC<CustomInputProps> = ({
  name,
  label,
  placeholder,
  type = "text",
  rules = {},
  className = "",
  options = [],
  icon,
}) => {
  const { control } = useFormContext();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  return (
    <div className={className}>
      <Controller
        name={name}
        control={control}
        rules={{
          ...rules,
          ...(type === "email" && {
            pattern: {
              value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
              message: "Please enter a valid email address",
            },
          }),
        }}
        render={({ field, fieldState }) => {
          const commonProps = {
            ...field,
            label,
            value: field.value ?? "",
            placeholder,
            fullWidth: true,
            error: !!fieldState.error,
            helperText: fieldState.error?.message,
            InputProps: {
              startAdornment: icon ? (
                <InputAdornment position="start">{icon}</InputAdornment>
              ) : undefined,
              endAdornment:
                type === "password" ? (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ) : undefined,
            },
          };

          switch (type) {
            case "textarea":
              return (
                <TextField
                  {...commonProps}
                  multiline
                  minRows={3}
                  variant="outlined"
                />
              );

            case "select":
              return (
                <TextField {...commonProps} select variant="outlined">
                  <MenuItem value="">{placeholder || "Select"}</MenuItem>
                  {options.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </TextField>
              );

            case "autocomplete":
              return (
                <Autocomplete
                  options={options}
                  getOptionLabel={(option) => option.label}
                  onChange={(_, value) => field.onChange(value?.value || "")}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={label}
                      placeholder={placeholder}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                  value={
                    options.find((opt) => opt.value === field.value) || null
                  }
                />
              );

            case "password":
              return (
                <TextField
                  {...commonProps}
                  type={isPasswordVisible ? "text" : "password"}
                  variant="outlined"
                />
              );

            case "email":
              return (
                <TextField {...commonProps} type="email" variant="outlined" />
              );

            case "file":
              return (
                <Box>
                  <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                    sx={{
                      textTransform: "none",
                      justifyContent: "flex-start",
                      borderColor: fieldState.error ? "error.main" : undefined,
                    }}
                  >
                    {field.value ? "Change File" : "Upload File"}
                    <input
                      type="file"
                      hidden
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        field.onChange(file || null);
                      }}
                    />
                  </Button>
                  {field.value && (
                    <Typography variant="body2" mt={1}>
                      Selected: {field.value?.name}
                    </Typography>
                  )}
                  {fieldState.error && (
                    <Typography color="error" variant="caption">
                      {fieldState.error.message}
                    </Typography>
                  )}
                </Box>
              );

            case "text":
            default:
              return (
                <TextField {...commonProps} type="text" variant="outlined" />
              );
          }
        }}
      />
    </div>
  );
};

export default CustomInput;
