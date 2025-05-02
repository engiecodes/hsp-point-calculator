import React from "react";
import classNames from "classnames"; 

const ReferencePanel = ({formData}) => {
    const baseListItemClass = "text-sm text-gray-800 p-1 rounded";
    const fontFormatClass = "text-sm space-x-2 space-y-1 text-gray-800";

    const ageMap = {
        "u29": "Under 30 years old (15 points)",
        "30_34": "30–34 years old (10 points)",
        "35_39": "35–39 years old (5 points)",
        "40p": "40 years old or above (0 points)",
    };
    const ageLabel = {
        "u29": "Under 30 years old",
        "30_34": "30–34 years old",
        "35_39": "35–39 years old ",
        "40p": "40 years old or above ",
    };
    const isInvalidMBA = formData.mbaDegree && formData.education !== "masters" && (formData.category === "technical" || formData.category === "business");
    
    const educationMap = {
        phd: "Doctoral degree (30 points)",
        masters: "Master’s or professional degree (20 points)",
        bachelor: "University degree (10 points)",
    };
    const educationMap_business = {
        phd: "Doctoral degree (20 points)",
        masters: "Master’s or professional degree (20 points)",
        bachelor: "University degree (10 points)",
    };
    const workExperienceMap_academic = {
        "7p": "7 years and more (15 points)",
        "5_6": "5 years or more, but less than 7 (10 points)",
        "3_4": "3 years or more, but less than 5 (5 points)",
        "u3" : "Less than 3 years (0 point)",
    };
    const workExperienceMap_technical = {
        "10p": "10 years and more (20 points)",
        "7_9": "7 years or more, but less than 10 (15 points)",
        "5_6": "5 years or more, but less than 7 (10 points)",
        "3_4": "3 years or more, but less than 5 (5 points)",
        "u3" : "Less than 3 years (0 point)",
    };
    const workExperienceMap_business = {
        "10p": "10 years and more (25 points)",
        "7_9": "7 years or more, but less than 10 (20 points)",
        "5_6": "5 years or more, but less than 7 (15 points)",
        "3_4": "3 years or more, but less than 5 (10 points)",
        "u3" : "Less than 3 years (0 point)",
    };
    const selectedWorkMap =
        formData.category === "academic" 
        ? workExperienceMap_academic
        : formData.category === "technical"
        ? workExperienceMap_technical
        : formData.category === "business"
        ? workExperienceMap_business
        : {};
    
    const companyPosition = {
        representative: "Representative director or representative executive officer (10 points)",
        director: "Director of executive officer (5 points)",
        notApplicable: "Not applicable (0 point)",
    };
    
    const salaryPointsMatrix = {
        "10p": { u29: 40, "30_34": 40, "35_39": 40, "40p": 40 },
        "9_10": { u29: 35, "30_34": 35, "35_39": 35, "40p": 35 },
        "8_9": { u29: 30, "30_34": 30, "35_39": 30, "40p": 30 },
        "7_8": { u29: 25, "30_34": 25, "35_39": 25, "40p": 0 },
        "6_7": { u29: 20, "30_34": 20, "35_39": 20, "40p": 0 },
        "5_6": { u29: 15, "30_34": 15, "35_39": 0,  "40p": 0 },
        "4_5": { u29: 10, "30_34": 0,  "35_39": 0,  "40p": 0 },
        "3_4": { u29: 0, "30_34": 0,  "35_39": 0,  "40p": 0 },
        "u3":  { u29: 0,  "30_34": 0,  "35_39": 0,  "40p": 0 },
    };

    const salaryLabels = {
        "10p": "¥10M+",
        "9_10": "¥9M – <10M",
        "8_9": "¥8M – <9M",
        "7_8": "¥7M – <8M",
        "6_7": "¥6M – <7M",
        "5_6": "¥5M – <6M",
        "4_5": "¥4M – <5M",
        "3_4": "¥3M – <4M",
        "u3": "Less than ¥3M"
    };

    const businessSalaryPoints = {
        "30p": { label: "￥30M or more", points: 50 },
        "25_30": { label: "￥25M or more, but less than ￥30M", points: 40 },
        "20_25": { label: "￥20M or more, but less than ￥25M", points: 30 },
        "15_20": { label: "￥15M or more, but less than ￥20M", points: 20 },
        "10_15": { label: "￥10M or more, but less than ￥15M", points: 10 },
        "u10": { label: "Less than ￥10M", points: 0 },
    };

    const researchAchievementsMap = {
        patent: {
          label: "Patent invention (1 item or more)",
          academic: 20,
          technical: 15,
        },
        grant: {
          label: "Public research grant (3 items or more)",
          academic: 20,
          technical: 15,
        },
        paper: {
          label: "Published 3+ academic papers in recognized Japanese journals",
          academic: 20,
          technical: 15,
        },
        other: {
          label: "Other research achievement (award / equivalent)",
          academic: 20,
          technical: 15,
        },
    };

    const nationalCertificationNum = {
        "2p" : "Holder of 2 or more national licenses (10 points)",
        "1" : "Holder of 1 national license (5 points)",
        "0" : "Not applicable (0 point)",
    };

    const jlptLevel = {
        "n1" : "(Bonus point 8) Level N1 of the Japanese Language Proficiency Test or equivalent proficiency test or a person who graduated from a foreign university having majored in Japanese language (15 points)",
        "n2" : "(Bonus point 9) Level N2 of the Japanese Language Proficiency Test or equivalent proficiency test (10 points)",
        "n0" : "Not applicable (0 point)",
    };
                    
      
    return(
        <div className="bg-white border rounded p-4 shadow-sm text-sm">
            <h2 className="text-lg font-semibold mb-2">Point Calculation Reference</h2>

            {/* Age Section */}
            <div className="mb-4">
                <p className="font-medium mb-1">Age Range <em className="font-normal">[Applicable for academic and technical]</em></p>
                <ul className="list-disc list-inside">
                
                    {Object.entries(ageMap).map(([key, label]) => (
                <li
                    key={key}
                    className={classNames(baseListItemClass, fontFormatClass, {
                    "bg-yellow-200 font-semibold": formData.age === key,
                    })}
                >
                    {label}
                </li>
                ))}
                </ul>
            </div>

            {/* Education Section */}
            <div className="mb-4">
                <p className="font-medium mb-1">Education</p>
                {(formData.category === "") && (
                    <em className="font-normal text-sm text-gray-400">Select category to display reference</em>
                )}
                {formData.category === "business" && (
                    <ul className="list-disc list-inside">  
                        {Object.entries(educationMap_business).map(([key, label]) => (
                        <li
                        key={key}
                        className={classNames(baseListItemClass, fontFormatClass, {
                        "bg-yellow-200 font-semibold": formData.education === key,
                        })}
                        >
                            {label}
                        </li>
                        ))}
                    </ul>
                )}

                {(formData.category === "academic" ||  formData.category === "technical") && (
                    <ul className="list-disc list-inside">
                        {Object.entries(educationMap).map(([key, label]) => (
                        <li
                        key={key}
                        className={classNames(baseListItemClass, fontFormatClass, {
                        "bg-yellow-200 font-semibold": formData.education === key,
                        })}
                        >
                            {label}
                        </li>
                        ))}
                    </ul>
                )}

            </div>
            <div className="mb-4">
                <p className="font-medium mb-1">Education-Related Bonus</p>
                <ul className="list-disc list-inside">
                    <li className={classNames(
                        baseListItemClass, 
                        fontFormatClass,
                        {"bg-yellow-200 font-semibold": formData.education === "masters" && formData.mbaDegree,
                        "bg-red-200 text-red-800 font-semibold": isInvalidMBA}
                    )}>
                        MBA/MOT degree holder (5 points) <em>[Applicable for Master's holder for technical and business]</em>
                        {isInvalidMBA && (
                            <span className="ml-2 italic text-sm text-red-700">
                                {"->"} Bonus not applicable without a Master's degree
                            </span>
                        )}
                    </li>
                    <li className={classNames(baseListItemClass, fontFormatClass, {
                        "bg-yellow-200 font-semibold": formData.extraDegree
                    })}>
                    Additional degree holder (5 points)
                    </li>
                    <li className={classNames(baseListItemClass, fontFormatClass, {
                        "bg-yellow-200 font-semibold": formData.japaneseUniDegree
                    })}>
                    Graduated from a Japanese university (10 points)
                    </li>
                    <li className={classNames(baseListItemClass,fontFormatClass, {
                        "bg-yellow-200 font-semibold": formData.specificUni
                    })}>
                    Graduated from a high-ranking university (10 points)
                    </li>
                </ul>
            </div>

            {/* Work Experience Section */}
            <div className="mb-4">
                <p className="font-medium mb-1">Work Experience</p>
                {(formData.category === "") && (
                    <em className="font-normal text-sm text-gray-400">Select category to display reference</em>
                )}

                <ul className="list-disc list-inside">
                    {Object.entries(selectedWorkMap).map(([key, label]) => (
                    <li
                    key={key}
                    className={classNames(baseListItemClass, fontFormatClass,{
                      "bg-yellow-200 font-semibold": formData.experience === key,
                    })}
                    >
                        {label}
                    </li>
                    ))}
                </ul>
            </div>
            {/* Bonus: Work-related */}
            <div className="mb-4">
            <p className="font-medium mb-1">Work-Related Bonus</p>
                    <ul className="list-disc list-inside">
                    {/* Bonus Point 2 */}
                    <li className="mb-2">
                        (Bonus point 2) Company position <em className="font-normal">[Applicable for business]</em>
                        <ul className="list-[circle] list-inside mt-1 ml-4 space-y-1">
                            {Object.entries(companyPosition).map(([key, label]) => (
                                <li
                                    key={key}
                                    className={classNames(baseListItemClass, fontFormatClass,{
                                        "bg-yellow-200 font-semibold": formData.companyPosition === key,
                                    })}
                                    >
                                    {label}
                                </li>
                            ))}
                        </ul>
                    </li>

                    {/* Bonus 4 */}
                    <li
                        className={classNames(baseListItemClass, fontFormatClass,{
                        "bg-yellow-200 font-semibold": formData.worksForGovSupportedOrg,
                        })}
                    >
                        (Bonus point 4) Employed by an organization that receives innovation support from the government (10 points)
                    </li>

                    {/* Bonus 4B */}
                    <li
                        className={classNames(baseListItemClass, fontFormatClass,{
                        "bg-yellow-200 font-semibold": formData.isSME,
                        })}
                    >
                        (Note 3) Employed by a small or medium-sized enterprise (SME) (10 points)
                    </li>

                    {/* Bonus 5 */}
                    <li
                        className={classNames(baseListItemClass, fontFormatClass,{
                        "bg-yellow-200 font-semibold": formData.smeWithRAndDOver3Percent,
                        })}
                    >
                        (Bonus point 5) SME whose R&D expenses exceed 3% of revenue (5 points)
                    </li>
                    {/* Bonus 10 */}
                    <li
                        className={classNames(baseListItemClass, fontFormatClass,{
                        "bg-yellow-200 font-semibold": formData.projectInGrowthField,
                        })}
                    >
                        (Bonus point 10) Work on an advanced project in a growth field  (10 points){" "}
                    </li>

                    {/* Bonus 14 */}
                    <li
                        className={classNames(baseListItemClass, fontFormatClass,{
                        "bg-yellow-200 font-semibold": formData.jobRelatedToInvestment,
                        })}
                    >
                        (Bonus point 14) Engaged in investment management business (10 points){" "}
                        <em className="font-normal">[Applicable for technical and business]</em>
                    </li>
                    
                    {/* Bonus 15 */}
                    <li
                        className={classNames(baseListItemClass, fontFormatClass,{
                        "bg-yellow-200 font-semibold": formData.targetOrganization,
                        })}
                    >
                        (Bonus point 15) Work for an organization which receives support as a target organization (approved by the
                        Minister of Justice) of promoting the acceptance of highly skilled foreign workers in local
                        governments in order to strengthen the international competitiveness of industry and form a
                        base for international economic activities (10 points)
                    </li>

                </ul>

            </div>
            
            {/* Income Section */}
            <div className="mb-4">
                {(formData.category === "") && (
                    <div className="mb-4">
                        <p className="font-medium mb-1">Income</p>
                        <em className="font-normal text-sm text-gray-400">Select category to display reference</em>
                    </div>
                )}
                {(formData.category === "academic" || formData.category === "technical") && (
                    <div className="mb-4 overflow-auto">
                        <p className="font-medium mb-1">Salary Points by Age</p>
                        <table className="w-full text-sm border border-collapse table-fixed text-center">
                            <thead>
                                <tr>
                                    <th className={classNames(fontFormatClass, "border p-1 bg-gray-100 w-32")}>Salary Bracket</th>
                                    
                                    {Object.entries(ageLabel).map(([ageKey, label]) => (
                                        <th key={ageKey} className={classNames(fontFormatClass, "border p-1 bg-gray-100")}>
                                            
                                        {label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(salaryPointsMatrix).map(([salaryKey, row]) => (
                                <tr key={salaryKey}>
                                    <td className={classNames(fontFormatClass, "border p-1")}>{salaryLabels[salaryKey]}</td>
                                    {Object.entries(ageLabel).map(([ageKey]) => {
                                    const point = row[ageKey] ?? 0;
                                    const isHighlighted = formData.income === salaryKey && formData.age === ageKey;

                                    return (
                                        <td
                                        key={ageKey}
                                        className={classNames("border p-1", {
                                            "bg-yellow-200 font-semibold": isHighlighted,
                                            "text-gray-400": point === 0 && !isHighlighted
                                        })}
                                        >
                                        {point}
                                        </td>
                                    );
                                    })}
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {formData.category === "business" && (
                    <div className="mb-4">
                        <p className="font-medium mb-1">Business Salary Points</p>
                        <ul className="list-disc list-inside">
                        {Object.entries(businessSalaryPoints).map(([key, { label, points }]) => (
                            <li
                            key={key}
                            className={classNames(baseListItemClass, fontFormatClass,{
                                "bg-yellow-200 font-semibold": formData.income === key,
                            })}
                            >
                            {label} ({points} points)
                            </li>
                        ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Business Investment Section */}
            <div className="mb-4">
                <p className="font-medium mb-1">Business Investment <em>[Applicable for business]</em></p>
                
                <ul className="list-disc list-inside">
                        {/* Bonus Point 13 */}
                        <li
                            className={classNames(baseListItemClass, fontFormatClass,{
                            "bg-yellow-200 font-semibold": formData.businessInvestment,
                            })}
                        >
                            (Bonus point 13) Investment of 100 million yen or more in the business done by the applicant (5 points)
                        </li>
                        
                    </ul>
            </div>

            {/* Research Achievements Section */}
            <div>
                {(formData.category === "") && (
                    <div className="mb-4">
                        <p className="font-medium mb-1">Income</p>
                        <em className="font-normal text-sm text-gray-400">Select category to display reference</em>
                    </div>
                )}
                {(formData.category === "academic" || formData.category === "technical") && (
                    <div className="mb-4">
                        <p className="font-medium mb-1">Research Achievements </p>
                        <p><em>[For academic, 1 for 20 points, 2 or more for 25 points. For technical, 1 or more for 15 points]</em></p>
                        <ul className="list-disc list-inside">
                            {Object.entries(researchAchievementsMap).map(([key, { label, academic, technical }]) => {
                                const selected = formData.researchAchievements?.[key];
                                const points = formData.category === "academic" ? academic : technical;

                                return (
                                    <li
                                        key={key}
                                        className={classNames(baseListItemClass, fontFormatClass,{
                                        "bg-yellow-200 font-semibold": selected,
                                        })}
                                    >
                                        {label} — {points} points
                                    </li>
                                );
                            })}
                        </ul>

                        {/* Display bonus note if 2+ selected for academic category */}
                        {formData.category === "academic" &&
                            Object.values(formData.researchAchievements || {}).filter(Boolean).length >= 2 && (
                            <p className="text-sm space-x-2 space-y-1 bg-green-200 text-green-900 rounded font-semibold">
                                ➡️ Two or more checked items for 25 points
                            </p>
                        )}
                    </div>
                )}
            </div>

            {/* === License and Certifications Section === */}
            <div>
                <div className="mb-4">
                    <p className="font-medium mb-1">Licenses and Certifications</p>
                    <ul className="list-disc list-inside space-y-1">
                        {/* Bonus Point 3 */}
                        <li className={classNames(fontFormatClass, "mb-2")}>
                            (Bonus point 2) National licenses <em className="font-normal">[Applicable for technical]</em>
                            <ul className="list-[circle] list-inside mt-1 ml-4 space-y-1">
                                {Object.entries(nationalCertificationNum).reverse().map(([key, label]) => (
                                    <li
                                        key={key}
                                        className={classNames(baseListItemClass, fontFormatClass,{
                                            "bg-yellow-200 font-semibold": formData.nationalCertificationNum === key,
                                        })}
                                        >
                                        {label}
                                    </li>
                                ))}
                            </ul>
                        </li>

                        {/* Bonus 6 */}
                        <li
                            className={classNames(baseListItemClass, fontFormatClass,{
                            "bg-yellow-200 font-semibold": formData.foreignWorkQualification,
                            })}
                        >
                            (Bonus point 6) Holder of a foreign qualification related to the work (5 points)
                        </li>
                        
                        {/* Bonus Point 8, 9 */}
                        <li className="mb-2">
                            Japanese Language Proficiency
                            <ul className="list-[circle] list-inside mt-1 ml-4 space-y-1">
                                {Object.entries(jlptLevel).map(([key, label]) => {
                                    const isSelected = formData.jlptLevel === key;
                                    // const isInvalidN2 = key === "n2" && formData.japaneseUniDegree;
                                    const isInvalidN2 = key === "n2" && formData.jlptLevel === "n2" && formData.japaneseUniDegree;

                                    return (
                                        <li
                                        key={key}
                                        className={classNames(
                                            baseListItemClass,
                                            fontFormatClass,
                                            {
                                            "bg-yellow-200 font-semibold": isSelected && !isInvalidN2,
                                            "bg-red-200 text-red-800 font-semibold": isSelected && isInvalidN2,
                                            }
                                        )}
                                        >

                                            {label}
                                            {isInvalidN2 && (
                                                <span className="ml-2 italic text-sm"> {'->'} N2 bonus not applicable if graduated from Japanese university</span>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </li>


                        {/* Bonus 12 */}
                        <li
                            className={classNames(baseListItemClass, fontFormatClass,{
                            "bg-yellow-200 font-semibold": formData.specificTraining,
                            })}
                        >
                            (Bonus point 12) Completion of the training separately specified by the Minister of Justice in a public notice excluding training in a Japanese institution of higher education (5 points)
                        </li>
                    </ul>
                </div>
                
            </div>
        </div>
    );
};

export default ReferencePanel;
