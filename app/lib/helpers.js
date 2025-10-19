const week_day = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
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
];
const months_short = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

const formatDate = (dateToFormat) => {
    if (dateToFormat) {
		let date = new Date(dateToFormat);
		return (
			months[date.getMonth()] +
			" " +
			date.getDate() +
			", " +
			date.getFullYear()
		);
	}
	return "";
}
const formatDateYYYYMMDD = (date) => {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
		2,
		"0"
	)}-${String(date.getDate()).padStart(2, "0")}`;
};

const calculatAge = (dateToFormat) => {
	if (dateToFormat) {
		var today = new Date();
		var birthDate = new Date(dateToFormat);
		var age = today.getFullYear() - birthDate.getFullYear();
		var m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	} else {
		return "";
	}
}
const patientAddress = (patient) => {
	let purok = patient?.purokData?.name
		? patient?.purokData?.name + ", "
		: patient?.purok
		? patient?.purok + ", "
		: " ";
	let brgy = patient?.barangayData?.name
		? patient?.barangayData?.name + ", "
		: patient?.barangay
		? patient?.barangay + ", "
		: " ";
	let mun = patient?.municipalityData?.name
		? patient?.municipalityData?.name + ", "
		: patient?.municipality
		? patient?.municipality + ", "
		: "";
	let city = patient?.province ? patient?.province : "Sarangani";
	return `${purok}${brgy}${mun}${city}`;
};
const doctorName = (doctor) => {
	let title = doctor?.title?.length > 0 ? doctor?.title : "";
	let firstname = doctor?.firstname;
	let lastname = doctor?.lastname;
	return `${title} ${firstname} ${lastname}`;
};
const doctorSpecialty = (doctor) => {
	return doctor?.specialty?.name || "General Practitioner";
};
const formatDateMMDDYYYYHHIIA = (date) => {
	return `${months[date.getMonth()]} ${String(date.getDate()).padStart(
		2,
		"0"
	)}, ${date.getFullYear()} ${
		date?.getHours() > 12
			? String(date?.getHours() - 12).padStart(2, "0")
			: String(date?.getHours()).padStart(2, "0")
	}:${String(date?.getMinutes()).padStart(2, "0")} ${
		date?.getHours() >= 12 ? "PM" : "AM"
	}`;
};
const calculateBPMeasurement = (systolic, diastolic) => {
	if (systolic <= 90 && diastolic <= 60) {
		return {
			result: "LOW",
			color: "hypertension-2",
		};
	}
	if (
		systolic >= 90 &&
		systolic <= 120 &&
		diastolic >= 60 &&
		diastolic <= 80
	) {
		return {
			result: "NORMAL",
			color: "normal",
		};
	}
	if (
		(systolic >= 121 && systolic <= 140) ||
		(diastolic >= 81 && diastolic <= 90)
	) {
		return {
			result: "PRE-Hypertension",
			color: "elevated",
		};
	}
	if (
		(systolic >= 141 && systolic <= 160) ||
		(diastolic >= 91 && diastolic <= 100)
	) {
		return {
			result: "HIGH: Stage 1 Hypertension",
			color: "hypertension-1",
		};
	}
	if (systolic >= 161 || diastolic >= 101) {
		return {
			result: "HIGH: Stage 2 Hypertension",
			color: "hypertension-2",
		};
	}
	return {
		result: "",
		color: "",
	};
};
const calculateBMI = (height /* in CM */, weight) => {
	let bmi = weight / ((height / 100) * (height / 100));
	let bmi_status = "normal";
	let bmi_color = "text-green-500";
	// under weight < 18.6, normal >= 18.6 <=24.9, overweight > 24.9
	if (bmi < 16) {
		bmi_status = "Sever Thinness";
		bmi_color = "sever-thin";
	}
	if (bmi > 16 && bmi <= 17) {
		bmi_status = "Moderate Thinness";
		bmi_color = "thin";
	}
	if (bmi > 17 && bmi <= 18.5) {
		bmi_status = "Mild Thinness";
		bmi_color = "mild-thin";
	}
	if (bmi > 18.5 && bmi <= 25) {
		bmi_status = "Normal";
		bmi_color = "normal";
	}
	if (bmi > 24.9 && bmi <= 30) {
		bmi_status = "Overweight";
		bmi_color = "over-weight";
	}
	if (bmi > 30 && bmi <= 35) {
		bmi_status = "Obese Class 1";
		bmi_color = "obese";
	}
	if (bmi > 35 && bmi <= 40) {
		bmi_status = "Obese Class 2";
		bmi_color = "obese";
	}
	if (bmi > 40) {
		bmi_status = "Obese Class 3";
		bmi_color = "obese";
	}
	return {
		bmi: bmi,
		status: bmi_status,
		bmi_color: bmi_color,
	};
};
export {
    formatDate,
	calculatAge,
	patientAddress,
	doctorName,
	doctorSpecialty,
	formatDateMMDDYYYYHHIIA,
	formatDateYYYYMMDD,
	calculateBPMeasurement,
	calculateBMI
}