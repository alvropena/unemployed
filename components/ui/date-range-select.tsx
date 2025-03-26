import React from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
] as const;

type Month = (typeof months)[number];

const years = Array.from(
	{ length: 50 },
	(_, i) => new Date().getFullYear() - i,
);

interface MonthSelectProps {
	value: string;
	onValueChange: (value: Month) => void;
	disabled?: boolean;
	placeholder?: string;
}

function MonthSelect({
	value,
	onValueChange,
	disabled,
	placeholder = "Month",
}: MonthSelectProps) {
	return (
		<Select
			value={value as Month}
			onValueChange={onValueChange}
			disabled={disabled}
		>
			<SelectTrigger className="w-full">
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{months.map((month) => (
					<SelectItem key={month} value={month}>
						{month}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}

interface YearSelectProps {
	value: string;
	onValueChange: (value: string) => void;
	disabled?: boolean;
	placeholder?: string;
	includePresent?: boolean;
}

function YearSelect({
	value,
	onValueChange,
	disabled,
	placeholder = "Year",
	includePresent,
}: YearSelectProps) {
	return (
		<Select value={value} onValueChange={onValueChange} disabled={disabled}>
			<SelectTrigger className="w-full">
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{includePresent && <SelectItem value="Present">Present</SelectItem>}
				{years.map((year) => (
					<SelectItem key={year} value={year.toString()}>
						{year}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}

interface OngoingCheckboxProps {
	id?: string;
	checked: boolean;
	onCheckedChange: (checked: boolean) => void;
	label: string;
}

function OngoingCheckbox({
	id,
	checked,
	onCheckedChange,
	label,
}: OngoingCheckboxProps) {
	return (
		<div className="items-top flex space-x-2">
			<Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} />
			<div className="grid gap-1.5 leading-none">
				<label
					htmlFor={id}
					className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				>
					{label}
				</label>
			</div>
		</div>
	);
}

interface DateRangeSelectProps {
	startMonth: string;
	startYear: string;
	endMonth: string;
	endYear: string;
	onDateChange: (
		startMonth: Month,
		startYear: string,
		endMonth: Month,
		endYear: string | "Present",
	) => void;
	label?: string;
	checkboxLabel?: string;
	id?: string;
}

export function DateRangeSelect({
	startMonth,
	startYear,
	endMonth,
	endYear,
	onDateChange,
	label = "Date Range",
	checkboxLabel = "Currently ongoing",
	id,
}: DateRangeSelectProps) {
	const handleStartMonthChange = (value: Month) => {
		onDateChange(
			value,
			startYear || years[0].toString(),
			(endMonth as Month) || "December",
			endYear || "Present",
		);
	};

	const handleStartYearChange = (value: string) => {
		onDateChange(
			(startMonth as Month) || "January",
			value,
			(endMonth as Month) || "December",
			endYear || "Present",
		);
	};

	const handleEndMonthChange = (value: Month) => {
		onDateChange(
			(startMonth as Month) || "January",
			startYear || years[0].toString(),
			value,
			endYear || "Present",
		);
	};

	const handleEndYearChange = (value: string) => {
		onDateChange(
			(startMonth as Month) || "January",
			startYear || years[0].toString(),
			(endMonth as Month) || "December",
			value,
		);
	};

	const handleOngoingChange = (checked: boolean) => {
		if (checked) {
			onDateChange(
				(startMonth as Month) || "January",
				startYear || years[0].toString(),
				"December",
				"Present",
			);
		} else {
			onDateChange(
				(startMonth as Month) || "January",
				startYear || years[0].toString(),
				"December",
				years[0].toString(),
			);
		}
	};

	return (
		<div className="space-y-4">
			<Label>{label}</Label>
			<div className="grid grid-cols-4 gap-2">
				<MonthSelect
					value={startMonth}
					onValueChange={handleStartMonthChange}
					placeholder="Start Month"
				/>
				<YearSelect
					value={startYear}
					onValueChange={handleStartYearChange}
					placeholder="Start Year"
				/>
				<MonthSelect
					value={endMonth}
					onValueChange={handleEndMonthChange}
					disabled={endYear === "Present"}
					placeholder="End Month"
				/>
				<YearSelect
					value={endYear}
					onValueChange={handleEndYearChange}
					disabled={endYear === "Present"}
					placeholder="End Year"
					includePresent
				/>
			</div>
			<OngoingCheckbox
				id={id ? `${id}-present` : undefined}
				checked={endYear === "Present"}
				onCheckedChange={handleOngoingChange}
				label={checkboxLabel}
			/>
		</div>
	);
}
