import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ResumeData } from "@/types/types";
import { defaultResumeData } from "@/lib/defaultData";

interface PersonalFormProps {
  personal: ResumeData["personal"];
  updatePersonal: (field: string, value: string | null) => void;
  onContinue?: () => void;
}

interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string | null) => void;
  placeholder?: string;
  prefix?: string;
  replacePrefix?: string;
}

const FormField = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  prefix,
  replacePrefix,
}: FormFieldProps) => {
  return (
    <div>
      <Label htmlFor={id} className="mb-3">
        {label}
      </Label>
      {prefix ? (
        <div className="relative flex">
          <div className="flex items-center bg-muted border border-r-0 rounded-l-md px-3 text-muted-foreground text-sm">
            {prefix}
          </div>
          <Input
            id={id}
            value={value}
            onChange={(e) =>
              onChange(
                replacePrefix
                  ? `${replacePrefix}${e.target.value}`
                  : e.target.value
              )
            }
            placeholder={placeholder || ""}
            className="rounded-l-none"
          />
        </div>
      ) : (
        <Input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || ""}
        />
      )}
    </div>
  );
};

export default function PersonalForm({
  personal,
  updatePersonal,
  onContinue,
}: PersonalFormProps) {
  const [name, setName] = useState(personal?.name || "");
  const [phone, setPhone] = useState(personal?.phone || "");
  const [email, setEmail] = useState(personal?.email || "");
  const [linkedin, setLinkedin] = useState(personal?.linkedin || "");
  const [github, setGithub] = useState(personal?.github || "");

  useEffect(() => {
    if (personal) {
      setName(personal.name || "");
      setPhone(personal.phone || "");
      setEmail(personal.email || "");
      setLinkedin(personal.linkedin || "");
      setGithub(personal.github || "");
    }
  }, [personal]);

  const handleChange = (
    field: string,
    value: string,
    setter: (value: string) => void
  ) => {
    setter(value);
    updatePersonal(field, value || null);
  };

  const getLinkedinPlaceholder = () => {
    const defaultLinkedin = defaultResumeData.personal.linkedin;
    return defaultLinkedin ? defaultLinkedin.replace("linkedin.com/in/", "") : "";
  };

  const getGithubPlaceholder = () => {
    const defaultGithub = defaultResumeData.personal.github;
    return defaultGithub ? defaultGithub.replace("github.com/", "") : "";
  };

  return (
    <div className="relative">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            id="name"
            label="Name"
            value={name}
            onChange={(value) => handleChange("name", value || "", setName)}
            placeholder={defaultResumeData.personal.name || ""}
          />
          <FormField
            id="phone"
            label="Phone"
            value={phone}
            onChange={(value) => handleChange("phone", value || "", setPhone)}
            placeholder={defaultResumeData.personal.phone || ""}
          />
          <FormField
            id="email"
            label="Email"
            value={email}
            onChange={(value) => handleChange("email", value || "", setEmail)}
            placeholder={defaultResumeData.personal.email || ""}
          />
          <FormField
            id="linkedin"
            label="LinkedIn"
            value={linkedin}
            onChange={(value) => handleChange("linkedin", value || "", setLinkedin)}
            placeholder={getLinkedinPlaceholder()}
            prefix="linkedin.com/in/"
          />
          <FormField
            id="github"
            label="GitHub"
            value={github}
            onChange={(value) => handleChange("github", value || "", setGithub)}
            placeholder={getGithubPlaceholder()}
            prefix="github.com/"
          />
        </CardContent>
      </Card>
      {onContinue && (
        <div className="mt-4 flex justify-end">
          <Button onClick={onContinue}>Continue</Button>
        </div>
      )}
    </div>
  );
}
