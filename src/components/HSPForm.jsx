import React, {useState, useEffect} from "react";
import {calculatePointsAndChecklist} from "../utils/hspLogic";
import ReferencePanel from './ReferencePanel';
import ResultDisplay from "./ResultDisplay";
import ChecklistDisplay from "./ChecklistDisplay";
import classNames from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleUp} from "@fortawesome/free-solid-svg-icons";


const HSPForm = () => {
    const fontFormatClass = "text-sm space-x-2 space-y-1";
    const [formData, setFormData] = useState({
        category: "",
        age: "",
        
        // Education
        education: "",
        mbaDegree: false,
        extraDegree: false,
        japaneseUniDegree: false,
        specificUni: false,

        // Work
        experience: "",
        companyPosition: "",
        worksForGovSupportedOrg: false,
        isSME: false,
        smeWithRAndDOver3Percent: false,
        projectInGrowthField: false,
        jobRelatedToInvestment: false,
        targetOrganization: false,

        // Finance
        income: "",
        businessInvestment: false,
        
        // Research
        researchAchievements: {
            patent: false,
            grant: false,
            paper: false,
            other: false,
          },
          
        // License
        nationalCertificationNum: "",
        foreignWorkQualification: false,
        jlptLevel: "",
        specificTraining: false,
    });
    const [result, setResult] = useState({ points: 0, checklist: [], message: "" });
    useEffect(() => {
        const result = calculatePointsAndChecklist(formData);
        setResult(result);
    }, [formData]);

    const [showScrollButton, setShowScrollButton] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const bodyHeight = document.body.scrollHeight;

            // Show button when near bottom
            setShowScrollButton(scrollY + windowHeight >= bodyHeight - 200);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if(name === "category"){
            // When category changes, reset all form fields
            setFormData({
            category: value,
            age: "",
            education: "",
            mbaDegree: false,
            extraDegree: false,
            japaneseUniDegree: false,
            specificUni: false,
        
            experience: "",
            companyPosition: "",
            worksForGovSupportedOrg: false,
            isSME: false,
            smeWithRAndDOver3Percent: false,
            projectInGrowthField: false,
            jobRelatedToInvestment: false,
            targetOrganization: false,
        
            income: "",
            businessInvestment: false,
        
            researchAchievements: {
                patent: false,
                grant: false,
                paper: false,
                other: false,
            },
        
            nationalCertificationNum: "",
            foreignWorkQualification: false,
            jlptLevel: "",
            specificTraining: false,
            });
            return;
        }
        //  Handle nested researchAchievements
        if(name.startsWith("researchAchievements.")){
            const key = name.split(".")[1];
            setFormData((prev) => ({
            ...prev,
            researchAchievements: {
                ...prev.researchAchievements,
                [key]: checked,
            },
            }));
            return;
        }
        
        // Regular update
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    return(
        <div className="max-w-6xl mx-auto p-6 bg-gray-50">
            <h1 className="text-2xl font-bold text-center mb-6">HSP Visa Points Calculator</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
                {/* === Left: Form Section === */}
                <div className="space-y-4 p-4 border rounded bg-white shadow-sm">
                    
                    {/* === Category Section (Always Visible) === */}
                    <label className="block">
                        Category
                        <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="mt-1 w-full border p-2 rounded"
                        >
                            <option value="">Select one</option>
                            <option value="academic">Academic</option>
                            <option value="technical">Technical</option>
                            <option value="business">Business</option>
                        </select>
                    </label>

                    {/* === Conditional Rendering: Show form if category selected === */}
                    {formData.category ? (
                        <>
                        {/* === Age Section === */}
                        {(formData.category === "academic" || formData.category === "technical") && (
                            <div className="block p-4 border rounded bg-white">
                                <p className="font-medium">👤 Age Range</p>
                                {[
                                    {label: "Under 30 years old", value: "u29"},
                                    {label: "30–34 years old", value: "30_34"},
                                    {label: "35–39 years old", value: "35_39"},
                                    {label: "40 years old or above", value: "40p"},
                                ].map((opt) => (
                                <label key={opt.value} className={classNames("flex items-center", fontFormatClass)}>
                                    
                                    <input
                                    type="radio"
                                    name="age"
                                    value={opt.value}
                                    checked={formData.age === opt.value}
                                    onChange={handleChange}
                                    />
                                    <span>{opt.label}</span>
                                </label>
                                ))}
                            </div>
                        )}

                        {/* === Education Section  === */}
                        <div className="block">
                            <div className="mt-6 p-4 border rounded bg-white">
                                <p className="font-medium mb-2">🎓 Education </p>
                                <div className="p-4 border rounded bg-white">
                                <p className="font-medium">Education Level</p>
                                    <select
                                    name="education"
                                    value={formData.education}
                                    onChange={handleChange}
                                    className={classNames("mt-1 w-full border p-2 rounded", fontFormatClass)}
                                    >
                                    <option value="">Select education level</option>
                                    {formData.category === "academic" && (
                                        <>
                                        <option value="phd">PhD</option>
                                        <option value="masters">Master's</option>
                                        <option value="bachelor">Bachelor's</option>
                                        </>
                                    )}
                                    {formData.category === "technical" && (
                                        <>
                                        <option value="phd">PhD</option>
                                        <option value="masters">Master's</option>
                                        <option value="bachelor">Bachelor's</option>
                                        </>
                                    )}
                                    {formData.category === "business" && (
                                        <>
                                        {/* No points difference for phd and masters */}
                                        <option value="phd">PhD</option> 
                                        <option value="masters">Master's</option>
                                        <option value="bachelor">Bachelor's</option>
                                        </>
                                    )}
                                    </select>
                                </div>
                                
                                <div className="mt-6 p-4 border rounded bg-white">
                                    <p className="font-medium mb-2">Bonus Points: Education-related</p>
                                    <label className={classNames("flex items-center mt-2", fontFormatClass)}>
                                        <input
                                            type="checkbox"
                                            name="mbaDegree"
                                            checked={formData.mbaDegree}
                                            onChange={handleChange}
                                            
                                        />
                                        <span>Holder of a professional degree in business management (MBA, MOT).</span>
                                    </label>
                                    <label className={classNames("flex items-center mt-2", fontFormatClass)}>
                                        <input
                                            type="checkbox"
                                            name="extraDegree"
                                            checked={formData.extraDegree}
                                            onChange={handleChange}
                                            
                                        />
                                        <span>Additional degree holder (doctoral, master's, or professional)</span>
                                    </label>
                                    <label className={classNames("flex items-center mt-2", fontFormatClass)}>
                                        <input
                                            type="checkbox"
                                            name="japaneseUniDegree"
                                            checked={formData.japaneseUniDegree}
                                            onChange={handleChange}
                                            
                                        />
                                        <span>Graduated from a Japanese university or completed a course of a Japanese graduate school</span>
                                    </label>
                                    <label className={classNames("flex items-center mt-2", fontFormatClass)}>
                                        <input
                                            type="checkbox"
                                            name="specificUni"
                                            checked={formData.specificUni}
                                            onChange={handleChange}
                                            
                                        />
                                        <span>Have graduated from one of the high-ranking universities</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        
                        {/* === Work Experience Section  === */}
                        <div className="block">
                            <div className="p-4 border rounded bg-white">
                                <p className="font-medium mb-2">💼 Work</p>
                                <div className={classNames("p-4 border rounded bg-white", fontFormatClass)}>
                               
                                    <div>
                                        <p className="font-medium">Work Experience</p>
                                        <select
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        className="mt-1 w-full border p-2 rounded"
                                        >
                                            <option value="">Select work experience</option>
                                            {formData.category === "academic" && (
                                                <>
                                                <option value="7p">7 years or more</option>
                                                <option value="5_6">5 years or more, but less than 7</option>
                                                <option value="3_4">3 years or more, but less than 5</option>
                                                <option value="u3">Less than 3 years</option>
                                                </>
                                            )}
                                            {formData.category === "technical" && (
                                                <>
                                                <option value="10p">10 years or more</option>
                                                <option value="7_9">7 years or more, but less than 10</option>
                                                <option value="5_6">5 years or more, but less than 7</option>
                                                <option value="3_4">3 years or more, but less than 5</option>
                                                <option value="u3">Less than 3 years</option>
                                                </>
                                            )}
                                            {formData.category === "business" && (
                                                <>
                                                <option value="10p">10 years or more</option>
                                                <option value="7_9">7 years or more, but less than 10</option>
                                                <option value="5_6">5 years or more, but less than 7</option>
                                                <option value="3_4">3 years or more, but less than 5</option>
                                                <option value="u3">Less than 3 years</option>
                                                </>
                                            )}
                                        </select>
                                    </div>
                                    {(formData.category === "business") && (
                                        <div className="mt-4">
                                            <span>Company position</span>
                                            <select
                                            name="companyPosition"
                                            value={formData.companyPosition}
                                            onChange={handleChange}
                                            className="mt-1 w-full border p-2 rounded"
                                            >
                                                <option value="">Select your job position</option>
                                                <>
                                                <option value="representative">Representative director or representative executive officer</option>
                                                <option value="director">Director or executive officer</option>
                                                <option value="notApplicable">Not applicable</option>
                                                </>
                                            </select>
                                        </div>
                                    )}
                                </div>
                                <div className="mt-6 p-4 border rounded bg-white">
                                    <p className="font-medium mb-2">Bonus Points: Work-related</p>       
                                    <label className={classNames("flex items-center mt-2", fontFormatClass)}>
                                        <input
                                            type="checkbox"
                                            name="worksForGovSupportedOrg"
                                            checked={formData.worksForGovSupportedOrg}
                                            onChange={handleChange}
                                            
                                        />
                                        <span>(Bonus point 4) Employed by an organization that receives innovation support from the government</span>
                                    </label>
                                    <label className={classNames("flex items-center mt-2", fontFormatClass)}>
                                        <input
                                            type="checkbox"
                                            name="isSME"
                                            checked={formData.isSME}
                                            onChange={handleChange}
                                            
                                        />
                                        <span>(Note 3) Employed by a small or medium-sized enterprise (SME)</span>
                                    </label>
                                    <label className={classNames("flex items-center mt-2", fontFormatClass)}>
                                        <input
                                            type="checkbox"
                                            name="smeWithRAndDOver3Percent"
                                            checked={formData.smeWithRAndDOver3Percent}
                                            onChange={handleChange}
                                            
                                        />
                                        <span>(Bonus point 5) Employed by an SME whose R&D expenses exceed 3% of total revenue</span>
                                    </label>
                                    <label className={classNames("flex items-center mt-2", fontFormatClass)}>
                                        <input
                                            type="checkbox"
                                            name="projectInGrowthField"
                                            checked={formData.projectInGrowthField}
                                            onChange={handleChange}
                                            
                                        />
                                        <span>(Bonus point 10) Work on an advanced project in a growth field </span>
                                    </label>
                                    {(formData.category === "technical" || formData.category === "business") && (
                                    <label className={classNames("flex items-center mt-2", fontFormatClass)}>
                                        <input
                                            type="checkbox"
                                            name="jobRelatedToInvestment"
                                            checked={formData.jobRelatedToInvestment}
                                            onChange={handleChange}
                                            
                                        />
                                        <span>(Bonus point 14) Engaged in business related to investment management</span>
                                    </label>
                                    )}
                                    <label className={classNames("flex items-center mt-2", fontFormatClass)}>
                                        <input
                                            type="checkbox"
                                            name="targetOrganization"
                                            checked={formData.targetOrganization}
                                            onChange={handleChange}
                                            
                                        />
                                        <span>(Bonus point 15) Employed by an organization designated by the Minister of Justice to promote the acceptance of highly skilled foreign workers and enhance regional industrial competitiveness.</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        
                        {/* === Salary Section === */}
                        <div className="p-4 border rounded bg-white">
                            <p className="font-medium mb-2">💴 Finance </p>
                            {(formData.category === "academic" || formData.category === "technical") && (
                                <div className="block p-4 border rounded bg-white">
                                    <p className="font-medium">Salary Range <em className="font-normal">(M represents million)</em></p>
                                    {[
                                        {label: "￥10M or more", value: "10p"},
                                        {label: "￥9M or more, but less than ￥10M", value: "9_10"},
                                        {label: "￥8M or more, but less than ￥9M", value: "8_9"},
                                        {label: "￥7M or more, but less than ￥8M", value: "7_8"},
                                        {label: "￥6M or more, but less than ￥7M", value: "6_7"},
                                        {label: "￥5M or more, but less than ￥6M", value: "5_6"},
                                        {label: "￥4M or more, but less than ￥5M", value: "4_5"},
                                        {label: "￥3M or more, but less than ￥4M", value: "3_4"},
                                        {label: "Less than ￥3M", value: "u3" },
                                    ].map((opt) => (
                                        <label key={opt.value} className={classNames("flex items-center", fontFormatClass)}>
                                            
                                            <input
                                            type="radio"
                                            name="income"
                                            value={opt.value}
                                            checked={formData.income === opt.value}
                                            onChange={handleChange}
                                            />
                                            <span>{opt.label}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                            {(formData.category === "business") && (
                                <div className="block">
                                    <div className="mt-4 p-4 border rounded bg-white">
                                        <p className="font-medium">Salary Range <em className="font-normal">(M represents million)</em></p>
                                        {[
                                            {label: "￥30M or more", value: "30p"},
                                            {label: "￥25M or more, but less than ￥30M", value: "25_30"},
                                            {label: "￥20M or more, but less than ￥25M", value: "20_25"},
                                            {label: "￥15M or more, but less than ￥20M", value: "15_20"},
                                            {label: "￥10M or more, but less than ￥15M", value: "10_15"},
                                            {label: "Less than ￥10M", value: "u10"},
                                        ].map((opt) => (
                                            <label key={opt.value} className={classNames("flex items-center", fontFormatClass)}>
                                                <input
                                                type="radio"
                                                name="income"
                                                value={opt.value}
                                                checked={formData.income === opt.value}
                                                onChange={handleChange}
                                                />
                                                <span>{opt.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                    <div className="mt-4 p-4 border rounded bg-white">
                                        <p className="font-medium">Business Investment</p>
                                        <label className={classNames("flex items-center mt-2", fontFormatClass)}>
                                        <input
                                            type="checkbox"
                                            name="businessInvestment"
                                            checked={formData.businessInvestment}
                                            onChange={handleChange}     
                                        />
                                        <span>Investment of 100 million yen or more in the business done by the applicant</span>
                                        </label>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* === Research Section === */}
                        {(formData.category === "academic" || formData.category === "technical") && (
                            <div className="block">
                                <div className="p-4 border rounded bg-white">
                                    <p className="font-medium mb-2">🔬 Research</p>

                                    <label className={classNames("flex items-center mt-2", fontFormatClass)}>
                                        <input
                                            type="checkbox"
                                            name="researchAchievements.patent"
                                            checked={formData.researchAchievements.patent}
                                            onChange={handleChange}
                                            
                                        />
                                        <span>Patent invention (1 item or more)</span>
                                    </label>

                                    <label className={classNames("flex items-center mt-2", fontFormatClass)}>
                                        <input
                                            type="checkbox"
                                            name="researchAchievements.grant"
                                            checked={formData.researchAchievements.grant}
                                            onChange={handleChange}
                                            
                                        />
                                        <span>Public research grant (3 items or more)</span>
                                    </label>

                                    <label className={classNames("flex items-center mt-2", fontFormatClass)}>
                                        <input
                                            type="checkbox"
                                            name="researchAchievements.paper"
                                            checked={formData.researchAchievements.paper}
                                            onChange={handleChange}
                                            
                                        />
                                        <span>Published 3+ academic papers in a recognized Japanese research journal</span>
                                    </label>

                                    <label className={classNames("flex items-center mt-2", fontFormatClass)}>
                                        <input
                                            type="checkbox"
                                            name="researchAchievements.other"
                                            checked={formData.researchAchievements.other}
                                            onChange={handleChange}
                                            
                                        />
                                        <span>Other research achievement (subject to approval by MOJ)</span>
                                    </label>
                                </div>
                            </div>
                        )}

                        {/* === License and Certifications Section === */}
                        <div className="block p-4 border rounded bg-white">
                            <p className="font-medium mb-2">📄 License & Certification</p>
                            {(formData.category === "technical") && (
                                <div className="p-4 border rounded bg-white">
                                    <p className="font-medium">National licenses</p>
                                    {[
                                        {label: "Holder of 2 or more national licenses", value: "2p"},
                                        {label: "Holder of 1 national licensess", value: "1"},
                                        {label: "Not applicable", value: "0"},
                                    ].map((opt) => (
                                    <label key={opt.value} className={classNames("flex items-center mt-2", fontFormatClass)}>
                                        <input
                                        type="radio"
                                        name="nationalCertificationNum"
                                        value={opt.value}
                                        checked={formData.nationalCertificationNum === opt.value}
                                        onChange={handleChange}
                                        />
                                        <span>{opt.label}</span>
                                    </label>
                                    ))}
                                </div>
                            )}

                            <div className="mt-4 p-4 border rounded bg-white">
                                <p className="font-medium">Foreign Qualification</p>
                                <label className={classNames("flex items-center mt-2", fontFormatClass)}>
                                    <input
                                        type="checkbox"
                                        name="foreignWorkQualification"
                                        checked={formData.foreignWorkQualification}
                                        onChange={handleChange}
                                        
                                    />
                                    <span>Holder of a foreign qualification related to the work</span>
                                </label>
                            </div>

                            <div className="mt-4 p-4 border rounded bg-white">
                                <p className="font-medium">Japanese Language Proficiency</p>
                                {[
                                    {label: "Level N1 of the Japanese Language Proficiency Test or equivalent", value: "n1"},
                                    {label: "Level N2 of the Japanese Language Proficiency Test or equivalent", value: "n2"},
                                    {label: "Not applicable", value: "n0"},
                                    ].map((opt) => (
                                    <label key={opt.value} className={classNames("flex items-center mt-2", fontFormatClass)}>
                                        <input
                                        type="radio"
                                        name="jlptLevel"
                                        value={opt.value}
                                        checked={formData.jlptLevel === opt.value}
                                        onChange={handleChange}
                                        />
                                        <span>{opt.label}</span>
                                    </label>
                                ))}
                            </div>
                            <div className="mt-4 p-4 border rounded bg-white">
                                <p className="font-medium">Specific Training</p>
                                <label className={classNames("flex items-center mt-2", fontFormatClass)}>
                                <input
                                    type="checkbox"
                                    name="specificTraining"
                                    checked={formData.specificTraining}
                                    onChange={handleChange}
                                    
                                />
                                <span>Completion of the training separately specified by the Minister of Justice in a public notice excluding training in a Japanese institution of higher education </span>
                                </label>
                            </div>
                            
                
                        </div>
                        
                        </>
                    ) : (
                        <p className="italic text-gray-500">Please select a category to continue.</p>
                    )}
                </div>
                {/* === Right: Reference Panel === */}
                <div className="bg-white border rounded p-4 shadow-sm">
                    <ReferencePanel formData={formData} />
                </div>
            </div>

            {showScrollButton && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="fixed bottom-6 right-6 bg-gray-600 hover:bg-indigo-700 text-white p-3 rounded-full transition-opacity"
                    aria-label="Scroll to top"
                >
                    <FontAwesomeIcon icon={faCircleUp} className="w-6 h-6"/>
                </button>
            )}
            
            {/* === Result and Checklist below grid === */}
            <div className="mt-8 space-y-4">
                <ResultDisplay points={result.points} message={result.message} />
                <ChecklistDisplay checklist={result.checklist} />
            </div>
        </div>
    );
};

export default HSPForm;
