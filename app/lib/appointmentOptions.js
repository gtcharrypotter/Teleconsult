const infectiousSymptoms = [
	{
		label: "Chest pain/discomfort/heaviness",
		value: "Chest pain/discomfort/heaviness",
		name: "Chest pain/discomfort/heaviness",
	},
	{
		label: "Acute fracture/dislocation/injuries",
		value: "Acute fracture/dislocation/injuries",
		name: "Acute fracture/dislocation/injuries",
	},
	{
		label: "Difficulty breathing",
		value: "Difficulty breathing",
		name: "Difficulty breathing",
	},
	{
		label: "Sign of abuse (i.e multiple bruises/injuries)",
		value: "Sign of abuse (i.e multiple bruises/injuries)",
		name: "Sign of abuse (i.e multiple bruises/injuries)",
	},
	{
		label: "Seizure/convulsion",
		value: "Seizure/convulsion",
		name: "Seizure/convulsion",
	},
	{
		label: "Severe abdominal pain",
		value: "Severe abdominal pain",
		name: "Severe abdominal pain",
	},
	{
		label: "Unconscious/restless/lethagic",
		value: "Unconscious/restless/lethagic",
		name: "Unconscious/restless/lethagic",
	},
	{
		label: "Persistent vomiting",
		value: "Persistent vomiting",
		name: "Persistent vomiting",
	},
	{
		label: "Not oriented to time, person/place",
		value: "Not oriented to time, person/place",
		name: "Not oriented to time, person/place",
	},
	{
		label: "Persistent diarrhea (>14 days)",
		value: "Persistent diarrhea (>14 days)",
		name: "Persistent diarrhea (>14 days)",
	},
	{
		label: "Bluish discoloration of skin/lips",
		value: "Bluish discoloration of skin/lips",
		name: "Bluish discoloration of skin/lips",
	},
	{
		label: "Unable to tolerate fluids",
		value: "Unable to tolerate fluids",
		name: "Unable to tolerate fluids",
	},
	{
		label: "Act of self-harm/suicide",
		value: "Act of self-harm/suicide",
		name: "Act of self-harm/suicide",
	},
	
	
];

 const symptoms2 = [
	{
		label: "Chest pain/discomfort/heaviness",
		value: "Chest pain/discomfort/heaviness",
		name: "chest_pain_discomfort_heaviness",
	},
	{
		label: "Acute fracture/dislocation/injuries",
		value: "Acute fracture/dislocation/injuries",
		name: "acute_fracture_dislocation_injuries",
	},
	{
		label: "Difficulty breathing",
		value: "Difficulty breathing",
		name: "difficulty_breathing",
	},
	{
		label: "Signs of abuse (i.e. multiple bruises/injuries)",
		value: "Signs of abuse (i.e. multiple bruises/injuries)",
		name: "signs_of_abuse",
	},
	{
		label: "Seizure/convulsion",
		value: "Seizure/convulsion",
		name: "deizure_convulsion",
	},
	{
		label: "Severe abdominal pain",
		value: "Severe abdominal pain",
		name: "severe_abdominal_pain",
	},
	{
		label: "Unconscious/restless/lethargic",
		value: "Unconscious/restless/lethargic",
		name: "unconscious_restless_lethargic",
	},
	{
		label: "Persistent vomiting",
		value: "Persistent vomiting",
		name: "persistent_vomiting",
	},
	{
		label: "Not oriented to time, person/place",
		value: "Not oriented to time, person/place",
		name: "not_oriented_to_time_person_place",
	},
	{
		label: "Persistent diarrhea (>14 days)",
		value: "Persistent diarrhea (>14 days)",
		name: "persistent_diarrhea",
	},
	{
		label: "Bluish discoloration of skin/lips",
		value: "Bluish discoloration of skin/lips",
		name: "bluish_discoloration_of_skin_lips",
	},
	{
		label: "Unable to tolerate fluids",
		value: "Unable to tolerate fluids",
		name: "unable_to_tolerate_fluids",
	},
	{
		label: "Act of self-harm/suicide",
		value: "Act of self-harm/suicide",
		name: "act_of_self_harm_suicide",
	},
];
 const symptoms = [
	{
		value: "cough_for_3_weeks_or_longer",
		label: "Cough for three weeks or longer",
	},
	{
		value: "coughing_up_blood_or_mucus",
		label: "Coughing up blood or mucus",
	},
	{ value: "chest_pain", label: "Chest pain" },
	{
		value: "pain_with_breathing_or_coughing",
		label: "Pain with breathing or coughing",
	},
	{ value: "fever", label: "Fever" },
	{ value: "chills", label: "Chills" },
	{ value: "night_sweats", label: "Night sweats" },
	{ value: "weight_loss", label: "Weight loss" },
	{ value: "not_wanting_to_eat", label: "Not wanting to eat" },
	{ value: "tiredness", label: "Tiredness" },
	{
		value: "not_feeling_well_in_general",
		label: "Not feeling well in general",
	},
];

//Common Cold Days 1 to 3

	 const viral_infectious = [
	{
		name: "Common_Colds",
		label: "Common Colds",
		value: "Common Colds",
	},
	{
		name: "Flu",
		label: "Flu",
		value: "Flu"
	},
	{ 	name: "Covid19", 
		label: "Covid19", 
		value: "Covid19" 
	},
	{
		name: "GastroEnteritis",
		label: "GastroEnteritis",
		value: "GastroEnteritis"
	},
	{	 name: "Hepatitis", 
		label: "Hepatitis", 
		value: "Hepatitis" 
	},
	{	 name: "RSV", 
		label: "RSV", 
		value: "RSV" 
	},
	{	 name: "Others", 
		label: "Others", 
		value: "Others" 
	},
	
];

	//Common Cold Days 4 to 7

	 const bacterial_infectious = [
	{
		name: "Strep_Throat",
		label: "Strep Throat",
		value: "Strep Throat",
	},
	{
		name: "Salmonella",
		label: "Salmonella",
		value: "Salmonella",
	},
	{ 	name: "Tuberculosis", 
		label: "Tuberculosis", 
		value: "Tuberculosis" 
	},
	{
		name: "Pertussis",
		label: "Pertussis",
		value: "Pertussis",
	},
	{	 name: "Chlamydia", 
		label: "Chlamydia", 
		value: "Chlamydia" 
	},
	{	 name: "Gonorrhea", 
		label: "Gonorrhea", 
		value: "Gonorrhea" 
	},
	{	 name: "Urinary_Tract_Infection", 
		label: "Urinary Tract Infection", 
		value: "Urinary Tract Infection" 
	},
	{	 name: "E_Coli", 
		label: "E Coli", 
		value: "E Coli" 
	},
	{	 name: "Others", 
		label: "Others", 
		value: "Others" 
	},
	
];

	//Common Cold Days 8 to 10

	 const fungal_infectious = [
		{
			name: "Ringworm",
			label: "Ringworm",
			value: "Ringworm",
		},
		{
			name: "Fungal_Nail",
			label: "Fungal Nail",
			value: "Fungal Nail",
		},
		{
			name: "Vaginal_Candidiasis",
			label: "Vaginal Candidiasis",
			value: "Vaginal Candidiasis",
		},
		{
			name: "Thrush",
			label: "Thrush",
			value: "Thrush",
		},
		{
			name: "Others",
			label: "Others",
			value: "Others",
		},
		
	];



	 const parasitic_infectious = [
		{
			name: "Giardiasis",
			label: "Giardiasis",
			value: "Giardiasis",
		},
		{
			name: "Toxoplasmosis",
			label: "Toxoplasmosis",
			value: "Toxoplasmosis",
		},
		{
			name: "Hookworms",
			label: "Hookworms",
			value: "Hookworms",
		},
		{
			name: "Pinworms",
			label: "Pinworms",
			value: "Pinworms",
		},
		{
			name: "Others",
			label: "Others",
			value: "Others",
		},

	];


	 const covid19 = [
		{
			name: "High_fever",
			label: "High fever",
			value: "High fever",
		},
		{
			name: "Difficulty_breathing",
			label: "Difficulty breathing",
			value: "Difficulty breathing",
		},
		{
			name: "Difficulty_on_Urinate",
			label: "Difficulty on Urinate",
			value: "Difficulty on Urinate",
		},
		{
			name: "Pain_in_your_chest_or_stomach",
			label: "Pain in your chest or stomach",
			value: "Pain in your chest or stomach",
		},
		{
			name: "Persistent_dizziness",
			label: "Persistent dizziness",
			value: "Persistent dizziness",
		},
		{
			name: "Confusion",
			label: "Confusion",
			value: "Confusion",
		},
		{
			name: "Severe_muscle_pain_or_weakness",
			label: "Severe muscle pain or weakness",
			value: "Severe muscle pain or weakness",
		},
		{
			name: "Seizures",
			label: "Seizures",
			value: "Seizures",
		},
		{
			name: "Fluctuating_fever_or_cough",
			label: "Fluctuating fever or cough",
			value: "Fluctuating fever or cough",
		},
		
		
	];

	
 const generalConsultation = [
	{
		value: "headache",
		label: "Headache",
	},
	{
		value: "cough",
		label: "Cough",
	},
	{ 
		value: "fever",
		label: "Fever" 
	},
	{
		value: "stomach_pain",
		label: "Stomach Pain",
	},
	{
		value: "difficult_breathing",
		label: "Difficuly Breathing",
	},
	{
		value: "other",
		label: "Others",
	},
	
];
 const malariaSymptoms = [
	{
		value: "fever",
		label: "Fever",
	},
	{
		value: "chills",
		label: "Chills",
	},
	{ value: "general_feeling_of_discomport", label: "General Feeling of Discomport" },
	{
		value: "headache",
		label: "Headache",
	},
	{ value: "nausea_and_vomiting", label: "Nausea and Vomiting" },
	{ value: "diarrhea", label: "Diarrhea" },
	{ value: "abdominal_pain", label: "Abdominal Pain" },
	{ value: "muscle_or_joint_pain", label: "Muscle or Joint Pain" },
	
];
 const diabetesSymptoms = [
	{
		value: "going_for_a_wee_a_lot",
		label: "Going for a wee a lot, especially at night",
	},
	{
		value: "being_really_thirsty",
		label: "Being really Thirsty",
	},
	{ value: "feeling_more_tired", label: "Feeling more tired thank usual" },
	{
		value: "losing_weight",
		label: "Losing weight without trying to",
	},
	{ value: "genital_itching", label: "Genital itching or thrush" },
	{ value: "cuts_and_wounds", label: "Cuts and wounds take longer to heal" },
	{ value: "blurred_eye", label: "Blurred Eyesight" },
	{ value: "increased_hunger", label: "Increased Hunger" },
	
];
 const hypertensionSymptoms = [
	{ value: "severe_headaches", label: "Severe Headaches" },
	{ value: "chest_pain", label: "Chest Pain" },
	{ value: "dizziness", label: "Dizziness" },
	{ value: "difficulty_breathing", label: "Difficulty Breathing" },
	{ value: "nausea", label: "Nausea" },
	{ value: "vomiting", label: "Vomiting" },
	{ value: "blurred_vision_or_other_vision_changes", label: "Blurred Vision or Vision Changes" },
	{ value: "anxiety", label: "Anxiety" },
	{ value: "confusion", label: "Confusion" },
	{ value: "buzzing_in_the_ears", label: "Buzzing in the Ears" },
	{ value: "nose_bleeds", label: "Nose Bleeds" },
	{ value: "abnormal_heart_rhythm", label: "Abnormal heart rhythm" },
	{ value: "pain_burning_while_urinating", label: "Pain or Burning while Urinating" },
	{ value: "frequent_urination", label: "Frequent Urination" },
	{ value: "empty_bladder", label: "Feeling the need to urinate despite having an empty bladder" },
	{ value: "bloody_urine", label: "Bloody Urine" },
	{ value: "pressure_or cramping", label: "Pressure or Cramping in the groin or lover abdomen" },

];
 const uRISymptoms = [
	{ value: "cough", label: "Cough" },
	{ value: "fever", label: "Fever" },
	{ value: "horse_voice", label: "Horse Voice" },
	{ value: "fatigue_lack_of_energy", label: "Fatigue and Lack of Energy" },
	{ value: "red_eyes", label: "Red eyes" },
	{ value: "runny_nose", label: "Runny Nose" },
	{ value: "sore_throat", label: "Sore Throat" },
	{ value: "swollen_lymph", label: "Swollen lymph nodes(swelling on the sides of your neck)" },


];
 const lRISymptoms = [
	{ value: "severe_cough", label: "Severe Cough" },
	{ value: "fever", label: "Fever" },
	{ value: "rapid_breathing", label: "Rapid Breathing or Difficulty Breathing" },
	{ value: "wheezing", label: "Wheezing" },
	{ value: "skin_turning", label: "Skin turning a blue color due to lack of oxygen" },
	{ value: "chest_pain", label: "Chest pain or tightness" },


];
 const diarrheaSymptoms = [
	{ value: "belly_cramps", label: "Belly (abdominal) cramps" },
	{ value: "stomach_pain", label: "Stomach pain" },
	{ value: "swelling", label: "Swelling (bloating)" },
	{ value: "upset_stomach", label: "Upset stomach (nausea)" },
	{ value: "urgent_bathroom", label: "Urgent need to go to the bathroom" },
	{ value: "fever", label: "Fever" },
	{ value: "bloody_stools", label: "Bloody Stool" },
	{ value: "lost_body_fluids", label: "Loss of Body Fluids(dehydration)" },


];
 const opdRoom = [
	{ value: "Room 1", label: "Room 1" },
	{ value: "Room 2", label: "Room 2" },
	{ value: "Room 3", label: "Room 3" },
	{ value: "Room 4", label: "Room 4" },
	{ value: "Room 5", label: "Room 5" },
	{ value: "Room 6", label: "Room 6" },
	{ value: "Room 7", label: "Room 7" },
	{ value: "Room 8", label: "Room 8" },
];
 const bedRoom = [
	{ value: "BED 1", label: "BED 1" },
	{ value: "BED 2", label: "BED 2" },
	{ value: "BED 3", label: "BED 3" },
	{ value: "BED 4", label: "BED 4" },
	{ value: "BED 5", label: "BED 5" },
	{ value: "BED 6", label: "BED 6" },
	{ value: "BED 7", label: "BED 7" },
	{ value: "BED 8", label: "BED 8" },


];
 const suiteRoom = [
	{ value: "SUITE 1", label: "SUITE 1" },
	{ value: "SUITE 2", label: "SUITE 2" },
	{ value: "SUITE 3", label: "SUITE 3" },
	{ value: "SUITE 4", label: "SUITE 4" },
	{ value: "SUITE 5", label: "SUITE 5" },
	{ value: "SUITE 6", label: "SUITE 6" },
	{ value: "SUITE 7", label: "SUITE 7" },
	{ value: "SUITE 8", label: "SUITE 8" },


];
 const privateRoom = [
	{ value: "PRIVATE 1", label: "PRIVATE 1" },
	{ value: "PRIVATE 2", label: "PRIVATE 2" },
	{ value: "PRIVATE 3", label: "PRIVATE 3" },
	{ value: "PRIVATE 4", label: "PRIVATE 4" },
	{ value: "PRIVATE 5", label: "PRIVATE 5" },
	{ value: "PRIVATE 6", label: "PRIVATE 6" },
	{ value: "PRIVATE 7", label: "PRIVATE 7" },
	{ value: "PRIVATE 8", label: "PRIVATE 8" },


];
 const nonPrivateRoom = [
	{ value: "NON PRIVATE 1", label: "NON PRIVATE 1" },
	{ value: "NON PRIVATE 2", label: "NON PRIVATE 2" },
	{ value: "NON PRIVATE 3", label: "NON PRIVATE 3" },
	{ value: "NON PRIVATE 4", label: "NON PRIVATE 4" },
	{ value: "NON PRIVATE 5", label: "NON PRIVATE 5" },
	{ value: "NON PRIVATE 6", label: "NON PRIVATE 6" },
	{ value: "NON PRIVATE 7", label: "NON PRIVATE 7" },
	{ value: "NON PRIVATE 8", label: "NON PRIVATE 8" },


];
 const isolationRoom = [
	{ value: "ISOLATION ROOM 1", label: "ISOLATION ROOM 1" },
	{ value: "ISOLATION ROOM 2", label: "ISOLATION ROOM 2" },
	{ value: "ISOLATION ROOM 3", label: "ISOLATION ROOM 3" },
	{ value: "ISOLATION ROOM 4", label: "ISOLATION ROOM 4" },
	{ value: "ISOLATION ROOM 5", label: "ISOLATION ROOM 5" },
	{ value: "ISOLATION ROOM 6", label: "ISOLATION ROOM 6" },
	{ value: "ISOLATION ROOM 7", label: "ISOLATION ROOM 7" },
	{ value: "ISOLATION ROOM 8", label: "ISOLATION ROOM 8" },


];
// INFECTIOUS DISEASES
 const covidSymptoms = [
	{ value: "Fever", label: "Fever" },
	{ value: "Chills", label: "Chills" },
	{ value: "Cough", label: "Cough" },
	{ value: "Fatigue", label: "Fatigue" },
	{ value: "Breathing Difficulties", label: "Breathing Difficulties" },
	{ value: "Loss of smell and taste", label: "Loss of smell and taste" },
	{ value: "Muscle or body aches", label: "Muscle or body aches" },
	{ value: "Headache", label: "Headache" },
	{ value: "Sore throat", label: "Sore throat" },
	{ value: "Nasal congestion (according to the CDC)", label: "Nasal congestion (according to the CDC)" },
	
];
 const influenzaSymptoms = [
	{ value: "Fever", label: "Fever" },
	{ value: "Malaise", label: "Malaise" },
	{ value: "Headache", label: "Headache" },
	{ value: "Runny Nose", label: "Runny Nose" },
	{ value: "Sneezing", label: "Sneezing" },
	{ value: "Reduced sence of smell", label: "Reduced sence of smell" },
	{ value: "Metallic taste in mouth", label: "Metallic taste in mouth" },
	{ value: "Chills", label: "Chills" },
	{ value: "Cough", label: "Cough" },
	{ value: "Body pain or muscle pain", label: "Body pain or muscle pain" },
	{ value: "Sore throat", label: "Sore throat" },
];
 const meningococcalAdultSymptoms = [
	{ value: "Fever", label: "Fever" },
	{ value: "Headache", label: "Headache" },
	{ value: "Stiff Neck", label: "Stiff Neck" },
	{ value: "Altered Mental Status (Confusion)", label: "Altered Mental Status (Confusion)" },
	{ value: "Nausea", label: "Nausea" },
	{ value: "Photophobia (eyes being more sensitive to light)", label: "Photophobia (eyes being more sensitive to light)" },
	{ value: "Vomiting", label: "Vomiting" },
];
 const meningococcalChildSymptoms = [
	{ value: "Appear to be slow or inactive", label: "Appear to be slow or inactive" },
	{ value: "Be irritable", label: "Be irritable" },
	{ value: "Feed poorly", label: "Feed poorly" },
	{ value: "Have a bulging anterior fontanelle (the soft spot of the skull)", label: "Have a bulging anterior fontanelle (the soft spot of the skull)" },
	{ value: "Have abnormal reflexes", label: "Have abnormal reflexes" },
	{ value: "Vomit", label: "Vomit" },
];
 const tuberculosisSymptoms = [
	{ value: "a bad cough that lasts for at least 3 weeks", label: "a bad cough that lasts for at least 3 weeks" },
	{ value: "chest pain", label: "chest pain" },
	{ value: "coughing up blood or phlegm from the lungs", label: "coughing up blood or phlegm from the lungs" },
	{ value: "breathlessness", label: "breathlessness" },
];
 const varicellaSymptoms = [
	{ value: "Raised pink or red bumps", label: "Raised pink or red bumps" },
	{ value: "Fluid filled blister bumps", label: "Fluid filled blister bumps" },
	{ value: "Crusts and scabs that cover the broken blisters", label: "Crusts and scabs that cover the broken blisters" },
	{ value: "Fever", label: "Fever" },
	{ value: "Loss of appetite", label: "Loss of appetite" },
	{ value: "Headache", label: "Headache" },
	{ value: "Tiredness and a general feeling of being unwell", label: "Tiredness and a general feeling of being unwell" },
];
 const rsvSymptoms = [
	{ value: "Fever", label: "Fever" },
	{ value: "Congestion", label: "Congestion" },
	{ value: "Cough", label: "Cough" },
	{ value: "Runny Nose", label: "Runny Nose" },
	{ value: "Sneezing", label: "Sneezing" },
	{ value: "Sore throat", label: "Sore throat" },
	{ value: "Mild Headache", label: "Mild Headache" },
	{ value: "Lack of energy", label: "Lack of energy" },
	{ value: "Wheezing", label: "Wheezing" },
];
 const ebolaSymptoms = [
	{ value: "Fever", label: "Fever" },
	{ value: "Fatigue", label: "Fatigue" },
	{ value: "Joint and muscle pain", label: "Joint and muscle pain" },
	{ value: "Headache", label: "Headache" },
	{ value: "Sore throat", label: "Sore throat" },
	{ value: "Cough", label: "Cough" },
	{ value: "Vomiting", label: "Vomiting" },
	{ value: "Diarrhea", label: "Diarrhea" },
	{ value: "Rash", label: "Rash" },
	{ value: "Unexplained bruising", label: "Unexplained bruising" },
	{ value: "Internal and external bleeding such as bleeding from gums and blood in stools", label: "Internal and external bleeding such as bleeding from gums and blood in stools" },
	{ value: "Weight loss", label: "Weight loss" },
];


 const generalHistories = [
	{
		label: "Hypertension",
		value: "Hypertension",
		name: "hypertension",
	},
	{
		label: "Stroke",
		value: "Stroke",
		name: "stroke",
	},
	{
		label: "Heart disease",
		value: "Heart disease",
		name: "heart_disease",
	},
	{
		label: "High cholesterol",
		value: "High cholesterol",
		name: "high_cholesterol",
	},
	{
		label: "Bleeding disorders",
		value: "Bleeding disorders",
		name: "bleeding_disorders",
	},
	{
		label: "Diabetes",
		value: "Diabetes",
		name: "diabetes",
	},
	{
		label: "Kidney disease",
		value: "Kidney disease",
		name: "kidney_disease",
	},
	{
		label: "Liver disease",
		value: "Liver disease",
		name: "liver_disease",
	},
	{
		label: "COPD",
		value: "COPD",
		name: "copd",
	},
	{
		label: "Asthma",
		value: "Asthma",
		name: "asthma",
	},
	{
		label: "Mental, Neurological and substance abuse",
		value: "Mental, Neurological and substance abuse",
		specify: "Please specify",
		name: "mental_neurological_substance_abuse",
	},
	{
		label: "Cancer",
		value: "Cancer",
		specify: "Please specify",
		name: "cancer",
	},
	{
		label: "Others",
		value: "Others",
		specify: "Please specify",
		name: "others",
	},
];

 const familyHistory = [
	
	{
		label: "Asthma",
		value: "Asthma",
		name: "asthma",
	},
	{
		label: "Cerebrovascular Disease",
		value: "Cerebrovascular Disease",
		name: "cerebrovascular_disease",
	},
	{
		label: "Coronary Artery Disease",
		value: "Coronary Artery Disease",
		name: "coronary_artery_disease",
	},
	{
		label: "Diabetes Mellitus",
		value: "Diabetes Mellitus",
		name: "diabetes_mellitus",
	},
	{
		label: "Emphysema",
		value: "Emphysema",
		name: "emphysema",
	},
	{
		label: "Epilepsy/Seizure Disorder",
		value: "Epilepsy/Seizure Disorder",
		name: "epilepsy_seizure_disorder",
	},
	
	{
		label: "Hyperlipidemia",
		value: "Hyperlipidemia",
		name: "hyperlipidemia",
	},
	{
		label: "Hypertension",
		value: "Hypertension",
		name: "hypertension",
	},
	{
		label: "Peptic Ulcer",
		value: "Peptic Ulcer",
		name: "peptic_ulcer",
	},
	{
		label: "Pneumonia",
		value: "Pneumonia",
		name: "pneumonia",
	},
	{
		label: "Tyroid Disease",
		value: "Tyroid Disease",
		name: "tyroid_disease",
	},
	
	
	{
		label: "Urinary Tract Infection",
		value: "Urinary Tract Infection",
		name: "urinary_tract_infection",
	},
	{
		label: "Mental Illness",
		value: "Mental Illness",
		name: "mental_illness",
	},
	{
		label: "None",
		value: "None",
		name: "none",
	},
	{
		label: "Allergy",
		value: "Allergy",
		specify: "Please specify",
		name: "allergy",
	},
	{
		label: "Cancer",
		value: "Cancer",
		specify: "Please specify",
		name: "cancer",
	},
	{
		label: "Hepatitis",
		value: "Hepatitis",
		specify: "Please specify",
		name: "hepatitis",
	},
	{
		label: "Pulmunary Tuberculosis",
		value: "Pulmunary Tuberculosis",
		specify: "Please specify",
		name: "pulmunary_tuberculosis",
	},
	{
		label: "Extrapulmunary Tuberculosis",
		value: "Extrapulmunary Tuberculosis",
		specify: "Please specify",
		name: "extrapulmunary_tuberculosis",
	},
	{
		label: "Others",
		value: "Others",
		specify: "Please specify",
		name: "others",
	}
];

 const medicalSurgicalHistories = [
	{
		label: "Asthma",
		name: "asthma_history",
	},
	{
		label: "Allergies",
		name: "allergies",
	},
	{
		label: "Allergies to medicine",
		name: "allergies_to_medicine",
	},
	{
		label: "Immunization",
		name: "immunization",
	},
	{
		label: "Injuries/accidents",
		name: "injuries_accidents",
	},
	{
		label: "Hearing problems",
		name: "hearing_problems",
	},
	{
		label: "Vision problems",
		name: "vision_problems",
	},
	{
		label: "Heart disease",
		name: "heart_disease_history",
	},
	{
		label: "Mental, neurological, learning. or substance use conditions (i.e. diagnosed learning disability, etc.)",
		name: "neurological_substance_use_conditions",
	},
	{
		label: "Cancer",
		name: "cancer_history",
	},
	{
		label: "Other organ disorders (i.e. thyroid, kidney, hypertension,diabetes, TB, etc.)",
		name: "other_organ_disorders",
	},
	{
		label: "Previous hospitalizations",
		name: "previous_hospitalizations",
	},
	{
		label: "Previous surgeries",
		name: "previous_surgeries",
	},
	{
		label: "Others",
		name: "other_medical_surgical_history",
	},
];

 const smokingHist = [
	{
		label: "YES",
		value: "YES",
		specify: "Pack",
		name: "yes",
	},
	{
		label: "NO",
		value: "NO",
		name: "no",
	},
	{
		label: "QUIT",
		value: "QUIT",
		name: "quit",
	}
];
 const alcoholHist = [
	{
		label: "YES",
		value: "YES",
		specify: "Bottles",
		name: "yes",
	},
	{
		label: "NO",
		value: "NO",
		name: "no",
	},
	{
		label: "QUIT",
		value: "QUIT",
		name: "quit",
	}
];
 const drugsHist = [
	{
		label: "YES",
		value: "YES",
		name: "yes",
	},
	{
		label: "NO",
		value: "NO",
		name: "no",
	},
];
 const sexualHist = [
	{
		label: "YES",
		value: "YES",
		name: "yes",
	},
	{
		label: "NO",
		value: "NO",
		name: "no",
	},
];
 const environmentalHistories = [
	{
		label: "None",
	},
	{
		label: "Point source (protected well/developed spring)",
	},
	{
		label: "Communal faucet/standpost",
	},
	{
		label: "Waterworks/individual house connection",
	},
];

 const sanitaryOptions = [
	{
		label: "Open defecation",
	},
	{
		label: "Toilet w/o water",
	},
	{
		label: "Toilet w/ septic tank",
	},
	{
		label: "Toilet (in house)",
	},
	{
		label: "Toilet (out of house)",
	},
	{
		label: "Toilet (public)",
	},
];

 const accessWasteOptions = [
	{
		label: "Waste segregation",
	},
	{
		label: "Composting",
	},
	{
		label: "Recycling/reuse",
	},
	{
		label: "City/municipal collection and disposal",
	},
	{
		label: "Burying",
	},
	{
		label: "Burning",
	},
];

 const immunizationChildren = [
{
		label: "BCG",
		name: "bcg",
		value: "BCG",
	},
	{
		label: "OPV1",
		name: "opv_1",
		value: "OPV1",
	},
	{
		label: "OPV2",
		name: "opv_2",
		value: "OPV2",
	},
	{
		label: "OPV3",
		name: "opv_3",
		value: "OPV3",
	},
	{
		label: "DPT1",
		name: "dpt_1",
		value: "DPT1",
	},
	{
		label: "DPT2",
		name: "dpt_2",
		value: "DPT2",
	},
	{
		label: "DPT3",
		name: "dpt_3",
		value: "DPT3",
	},
	{
		label: "Measles",
		name: "measles",
		value: "Measles",
	},
	{
		label: "Hepatitis B1",
		name: "hepatitis_b1",
		value: "Hepatitis B1",
	},
	{
		label: "Hepatitis B2",
		name: "hepatitis_b2",
		value: "Hepatitis B2",
	},
	{
		label: "Hepatitis B3",
		name: "hepatitis_b3",
		value: "Hepatitis B3",
	},
	{
		label: "Hepatitis A",
		name: "hepatitis_a",
		value: "Hepatitis",
	},
	{
		label: "Varicella(Chicken Pox)",
		name: "varicella",
		value: "Varicella(Chicken Pox)",
	},
	{
		label: "None",
		name: "none",
		value: "None_child",
	},
];
 const immunizationAdult = [
	{
		label: "HPV",
		name: "hpv",
		value: "HPV",
	},
	{
		label: "MMR",
		name: "mmr",
		value: "MMR",
	},
	{
		label: "None",
		name: "none",
	},
	
];
 const immunizationPregnant = [
	{
		label: "Tetanus Toxoid",
		name: "tetanus_toxoid",
		value: "Tetanus Toxoid",
	},
	{
		label: "None",
		name: "none",
	},
	
];
 const immunizationElder = [
	{
		label: "Pneumococcal vaccine",
		name: "pneumococcal_vaccine",
		value: "Pneumococcal vaccine",
	},
	{
		label: "Flu Vaccine",
		name: "flu_vaccine",
		value: "Flu Vaccine",
	},
	{
		label: "None",
		name: "none",
	},
	
];
 const abdomenLib = [
	{
		label: "Flat",
		name: 'flat',
		value: "Flat",
	},
	{
		label: "Hyperactive bowel sounds",
		name: 'hyperactive_bowel_sounds',
		value: "Hyperactive bowel sounds",
	},
	{
		label: "Palpable mass(es)",
		name: 'palpable_mass',
		value: "Palpable mass(es)",
	},
	{
		label: "Tympanitic/dull abdomen",
		name: 'tympanitic',
		value: "Tympanitic/dull abdomen",
	},
	{
		label: "Uterine contraction",
		name: 'uterine_contraction',
		value: "Uterine contraction",
	},
	{
		label: "Flabby",
		name: 'flabby',
		value: "Flabby",
	},
	{
		label: "Globullar",
		name: 'globullar',
		value: "Globullar",
	},
	{
		label: "Muscle guarding",
		name: 'muscle_guarding',
		value: "Muscle guarding",
	},
	{
		label: "Tenderness",
		name: 'tenderness',
		value: "Tenderness",
	},

	{
		label: "Essentially normal",
		name: 'essentially_normal',
		value: "Essentially normal",
	},
	{
		label: "Abdominal rigidity",
		name: 'abdominal_rigidity',
		value: "Abdominal rigidity",
	},
	{
		label: "Abdominal tenderness",
		name: 'abdominal_tenderness',
		value: "Abdominal tenderness",
	},
	{
		label: "Others",
		name: 'others_abdomen',
		value: "Others",
	},
	
]
 const chestLib = [
	{
		label: "Symmetrical chest expansion",
		name: 'symmetrical',
		value: "Symmetrical chest expansion"
	},
	{
		label: "Lumps over breast(s)",
		name: 'lumps_over_breast',
		value: "Lumps over breast(s)"
	},
	{
		label: "Clear breath sounds",
		name: 'clear_breath_sounds',
		value: "Clear breath sounds"
	},
	{
		label: "Retractions",
		name: 'retractions',
		value: "Retractions"
	},
	{
		label: "Crackles/rales",
		name: 'crackles',
		value: "Crackles/rales"
	},
	{
		label: "Wheezes",
		name: 'wheezes',
		value: "Wheezes"
	},
	{
		label: "Essentially normal",
		name: 'essentially_normal_chest',
		value: "Essentially normal"
	},
	{
		label: "Asymmetrical chest expansion",
		name: 'asymmetrical_chest_expansion',
		value: "Asymmetrical chest expansion"
	},
	{
		label: "Decreased breath sounds",
		name: 'decreased_breath_sounds',
		value: "Decreased breath sounds"
	},
	{
		label: "Enlarge Axillary Lymph Nodes",
		name: 'enlarge_axillary',
		value: "Enlarge Axillary Lymph Nodes"
	},
	{
		label: "Others",
		name: 'others_chest',
		value: "Others"
	},
	
]
 const chestXrayFindings = [
	{
		label: "NORMAL",
		value: "NORMAL"
	},
	{
		label: "BRONCHIOLITIS",
		value: "BRONCHIOLITIS"
	},
	{
		label: "CHRONIC OBSTRUCTIVE PULMONARY DISEASE",
		value: "CHRONIC OBSTRUCTIVE PULMONARY DISEASE"
	},
	{
		label: "PULMONARY MASS",
		value: "PULMONARY MASS"
	},
	{
		label: "PNEUMONIA",
		value: "PNEUMONIA"
	},
	{
		label: "PTB/KOCHS",
		value: "PTB/KOCHS"
	},
	{
		label: "PLEURAL EFFUSION",
		value: "PLEURAL EFFUSION"
	},
	{
		label: "PNEUMOTHORAX",
		value: "PNEUMOTHORAX"
	},
	{
		label: "EMPHYSEMA",
		value: "EMPHYSEMA"
	},
	{
		label: "CHRONIC BRONCHITIS",
		value: "CHRONIC BRONCHITIS"
	},
	{
		label: "BRONCHIECTASIS",
		value: "BRONCHIECTASIS"
	},
	{
		label: "ACUTE BRONCHITIS",
		value: "ACUTE BRONCHITIS"
	},
	{
		label: "OTHERS",
		value: "OTHERS"
	},
]
 const digitalRectalLib = [
	{
		label: 'Essentially normal',
		name: 'essentially_normal_digital',
		value: 'Essentially normal'
	},
	{
		label: 'Enlarge Prospate',
		name: 'enlarge_prospate',
		value: 'Enlarge Prospate'
	},
	{
		label: 'Mass',
		name: 'mass',
		value: 'Mass'
	},
	{
		label: 'Hemorrhoids',
		name: 'hemorrhoids',
		value: 'Hemorrhoids'
	},
	{
		label: 'Pus',
		name: 'pus',
		value: 'Pus'
	},
	{
		label: 'Not Applicable',
		name: 'not_applicable',
		value: 'Not Applicable'
	},
	{
		label: 'Others',
		name: 'others_digital',
		value: 'Others'
	},
]
 const genitourinaryLib = [
	{
		label: 'Essentially normal',
		name: 'essentially_normal_genitourinary',
		value: 'Essentially normal'
	},
	{
		label: 'Blood stained in exam finger',
		name: 'blood_stained',
		value: 'Blood stained in exam finger'
	},
	{
		label: 'Cervical dilatation',
		name: 'cervical_dilatation',
		value: 'Cervical dilatation'
	},
	{
		label: 'Presence of abnormal discharge',
		name: 'abnormal_discharge',
		value: 'Presence of abnormal discharge'
	},
	{
		label: 'Others',
		name: 'others_genitourinary',
		value: 'Others'
	},
]
 const heartLib = [
	{
		label: 'Adynamic precordium',
		name: 'adynamic_precordium',
		value: 'Adynamic precordium'
	},
	{
		label: 'Normal rate regular rhythm',
		name: 'regular_rhythm',
		value: 'Normal rate regular rhythm'
	},
	{
		label: 'Heaves/trills',
		name: 'heaves',
		value: 'Heaves/trills'
	},
	{
		label: 'Murmurs',
		name: 'murmurs',
		value: 'Murmurs'
	},
	{
		label: 'Essentially normal',
		name: 'essentially_normal_heart',
		value: 'Essentially normal'
	},
	{
		label: 'Displaced apex beat',
		name: 'apex_beat',
		value: 'Displaced apex beat'
	},
	{
		label: 'Irregular rhythm',
		name: 'irregular_rhythm',
		value: 'Irregular rhythm'
	},
	{
		label: 'Muffled heart sounds',
		name: 'muffled_heart',
		value: 'Muffled heart sounds'
	},
	{
		label: 'Pericardial bulge',
		name: 'pericardial_bulge',
		value: 'Pericardial bulge'
	},
	{
		label: 'Others',
		name: 'others_heart',
		value: 'Others'
	},
]
 const heentLib = [
	{
		label: 'Anicteric sclerae',
		name: 'anicteric_sclerae',
		value: 'Anicteric sclerae'
	},
	{
		label: 'Exudates',
		name: 'exudates',
		value: 'Exudates'
	},
	{
		label: 'Essentially Normal',
		name: 'essentially_normal_heent',
		value: 'Essentially Normal'
	},
	{
		label: 'Abnormal pupillary reaction',
		name: 'abnormal_pupillary',
		value: 'Abnormal pupillary reaction'
	},
	{
		label: 'Cervical lympadenopathy',
		name: 'cervical_lympadenopathy',
		value: 'Cervical lympadenopathy'
	},
	{
		label: 'Dry mucous membrane',
		name: 'dry_mucous_membrane',
		value: 'Dry mucous membrane'
	},
	{
		label: 'Icteric sclerae',
		name: 'icteric_sclerae',
		value: 'Icteric sclerae'
	},
	{
		label: 'Pale conjunctivae',
		name: 'pale_conjunctivae',
		value: 'Pale conjunctivae'
	},
	{
		label: 'Sunken eyeballs',
		name: 'sunken_eyeballs',
		value: 'Sunken eyeballs'
	},
	{
		label: 'Sunken fontanelle',
		name: 'sunken_fontanelle',
		value: 'Sunken fontanelle'
	},
	{
		label: 'Intact tympanic mebrane',
		name: 'intact_tympanic',
		value: 'Intact tympanic mebrane'
	},
	{
		label: 'Pupils brisky reactive to light',
		name: 'pupils_brisky',
		value: 'Pupils brisky reactive to light'
	},
	{
		label: 'Tonsillopharyngeal congestion',
		name: 'tonsillopharyngeal',
		value: 'Tonsillopharyngeal congestion'
	},
	{
		label: 'Hypertropic tonsils',
		name: 'hypertropic_tonsils',
		value: 'Hypertropic tonsils'
	},
	{
		label: 'Alar flaring',
		name: 'alar_flaring',
		value: 'Alar flaring'
	},
	{
		label: 'Nasal discharge',
		name: 'nasal_discharge',
		value: 'Nasal discharge'
	},
	{
		label: 'Aural discharge',
		name: 'aural_discharge',
		value: 'Aural discharge'
	},
	{
		label: 'Palpable mass',
		name: 'palpable_mass',
		value: 'Palpable mass'
	},
	{
		label: 'Others',
		name: 'others_heent',
		value: 'Others'
	},
]
 const managementLib = [
	{
		label: 'Breastfeeding Program Education',
		value: 'Breastfeeding Program Education'
	},
	{
		label: 'Counselling for Smoking Cessation',
		value: 'Counselling for Smoking Cessation'
	},
	{
		label: 'Counselling for Lifestyle Modification',
		value: 'Counselling for Lifestyle Modification'
	},
	{
		label: 'Oral Check-up and Prophylaxis',
		value: 'Oral Check-up and Prophylaxis'
	},
	{
		label: 'Not applicable',
		value: 'Not applicable'
	},
	{
		label: 'Others',
		value: 'Others'
	},
]
 const neuroLib = [
	{
		label: 'Developmental delay',
		value: 'Developmental delay'
	},
	{
		label: 'Abnormal reflex(es)',
		value: 'Abnormal reflex(es)'
	},
	{
		label: 'Poor/altered memory',
		value: 'Poor/altered memory'
	},
	{
		label: 'Poor muscle tone/strength',
		value: 'Poor muscle tone/strength'
	},
	{
		label: 'Poor coordination',
		value: 'Poor coordination'
	},
	{
		label: 'Seizures',
		value: 'Seizures'
	},
	{
		label: 'Normal',
		value: 'Normal'
	},
	{
		label: 'Motor Deficit',
		value: 'Motor Deficit'
	},
	{
		label: 'Sensory Deficit',
		value: 'Sensory Deficit'
	},
	{
		label: 'Essentially normal',
		value: 'Essentially normal'
	},
	{
		label: 'Abnormal gait',
		value: 'Abnormal gait'
	},
	{
		label: 'Abnormal position sense',
		value: 'Abnormal position sense'
	},
	{
		label: 'Abnormal sensation',
		value: 'Abnormal sensation'
	},
	{
		label: 'Others',
		value: 'Others'
	},
	
]
 const skinLib = [
	{
		label: 'Essentially normal',
		name: 'essentially_normal_skin',
		value: 'Essentially normal'
	},
	{
		label: 'Weak pulses',
		name: 'weak_pulses',
		value: 'Weak pulses'
	},
	{
		label: 'Clubbing',
		name: 'clubbing',
		value: 'Clubbing'
	},
	{
		label: 'Cold clammy',
		name: 'cold_clammy',
		value: 'Cold clammy'
	},
	{
		label: 'Cyanosis/mottled skin',
		name: 'cyanosis',
		value: 'Cyanosis/mottled skin'
	},
	{
		label: 'Edema/swelling',
		name: 'edema_swelling',
		value: 'Edema/swelling'
	},
	{
		label: 'Decreased mobility',
		name: 'decreased_mobility',
		value: 'Decreased mobility'
	},
	{
		label: 'Pale nailbeds',
		name: 'pale_nailbeds',
		value: 'Pale nailbeds'
	},
	{
		label: 'Poor skin turgor',
		name: 'poor_skin_turgor',
		value: 'Poor skin turgor'
	},
	{
		label: 'Rashes/Petechiae',
		name: 'rashes_petechiae',
		value: 'Rashes/Petechiae'
	},
	{
		label: 'Others',
		name: 'others_skin',
		value: 'Others'
	},
]
 const disposition = [
	{
		label: 'Improved',
		name: 'improved',
		value: 'Improved'
	},
	{
		label: 'Recovered',
		name: 'recovered',
		value: 'Recovered'
	},
	{
		label: 'Home/Discharged Against Medical Advise',
		name: 'home_discharge',
		value: 'Home/Discharged Against Medical Advise'
	},
	{
		label: 'Absconded',
		name: 'absconded',
		value: 'Absconded'
	},
	{
		label: 'Expired',
		name: 'expired',
		value: 'Expired'
	},
	{
		label: 'Transferred/Referred',
		name: 'transferred_referred',
		value: 'Transferred/Referred'
	},
]

export {
	infectiousSymptoms,
	symptoms2,
	symptoms,
	viral_infectious,
	bacterial_infectious,
	fungal_infectious,
	parasitic_infectious,
	covid19,
	generalConsultation,
	malariaSymptoms,
	diabetesSymptoms,
	hypertensionSymptoms,
	uRISymptoms,
	lRISymptoms,
	diarrheaSymptoms,
	opdRoom,
	bedRoom,
	suiteRoom,
	privateRoom,
	nonPrivateRoom,
	isolationRoom,
	covidSymptoms,
	influenzaSymptoms,
	meningococcalAdultSymptoms,
	meningococcalChildSymptoms,
	tuberculosisSymptoms,
	varicellaSymptoms,
	rsvSymptoms,
	ebolaSymptoms,
	generalHistories,
	familyHistory,
	medicalSurgicalHistories,
	smokingHist,
	alcoholHist,
	drugsHist,
	sexualHist,
	environmentalHistories,
	sanitaryOptions,
	accessWasteOptions,
	immunizationChildren,
	immunizationAdult,
	immunizationPregnant,
	immunizationElder,
	abdomenLib,
	chestLib,
	chestXrayFindings,
	digitalRectalLib,
	genitourinaryLib,
	heartLib,
	heentLib,
	managementLib,
	neuroLib,
	skinLib,
	disposition
}