import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ResumeData } from "@/lib/types";
import { defaultResumeData } from "@/lib/defaultData";

interface PersonalFormProps {
  personal: ResumeData["personal"];
  updatePersonal: (field: string, value: string) => void;
}

interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
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
            placeholder={placeholder}
            className="rounded-l-none"
          />
        </div>
      ) : (
        <Input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default function PersonalForm({
  personal,
  updatePersonal,
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
    updatePersonal(field, value);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => handleChange("name", e.target.value, setName)}
          placeholder={defaultResumeData.personal.name}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          value={phone}
          onChange={(e) => handleChange("phone", e.target.value, setPhone)}
          placeholder={defaultResumeData.personal.phone}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          value={email}
          onChange={(e) => handleChange("email", e.target.value, setEmail)}
          placeholder={defaultResumeData.personal.email}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="linkedin">LinkedIn</Label>
        <div className="relative flex">
          <div className="flex items-center bg-muted border border-r-0 rounded-l-md px-3 text-muted-foreground text-sm">
            linkedin.com/in/
          </div>
          <Input
            id="linkedin"
            value={linkedin}
            onChange={(e) => handleChange("linkedin", e.target.value, setLinkedin)}
            placeholder={defaultResumeData.personal.linkedin.replace("linkedin.com/in/", "")}
            className="rounded-l-none"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="github">GitHub</Label>
        <div className="relative flex">
          <div className="flex items-center bg-muted border border-r-0 rounded-l-md px-3 text-muted-foreground text-sm">
            github.com/
          </div>
          <Input
            id="github"
            value={github}
            onChange={(e) => handleChange("github", e.target.value, setGithub)}
            placeholder={defaultResumeData.personal.github.replace("github.com/", "")}
            className="rounded-l-none"
          />
        </div>
      </div>
    </div>
  );
}
