export function calculatePointsAndChecklist(formData){
    let points = 0;
    const checklist = [];
    let message = ""

    // === Age Points (Academic & Technical only) ===
    if(formData.category === "academic" || formData.category === "technical"){
        switch (formData.age){
        case "u29":
            points += 15;
            break;
        case "30_34":
            points += 10;
            break;
        case "35_39":
            points += 5;
            break;
        case "40p":
            break;
        default:
            break;
        }
    }

    // === Education Level ===
    if(formData.education){
        if(formData.category === "academic" || formData.category === "technical"){
            switch(formData.education){
                case "phd":
                    points += 30;
                    checklist.push("Certificate of Doctoral Degree");
                    break;
                case "masters":
                    points += 20;
                    checklist.push("Certificate of Master's Degree");
                    break;
                case "bachelor":
                    points += 10;
                    checklist.push("Certificate of Bachelor's Degree");
                    break;
                default:
                    break;
            }
        }else if(formData.category === "business"){
            // For business, phd and masters both give 20
            if(formData.education === "phd"){
                points += 20;
                checklist.push("Certificate of Doctoral Degree");
            }else if(formData.education === "masters"){
                points += 20;
                checklist.push("Certificate of Master's Degree");
            }else if(formData.education === "bachelor"){
                points += 10;
                checklist.push("Certificate of Bachelor's Degree");
            }
        }
    }

    // === Bonus: Additional Degree
    if(formData.extraDegree){
        points += 5;
        checklist.push("Certificate for additional degree");
        checklist.push("Academic transcript of additional degree (may be asked to submit)");
    }
    // === Note 7: MBA Degree (Business and conditionally Technical)
    if((formData.category === "technical" ||  formData.category === "business") && formData.education === "masters" && formData.mbaDegree){
        points += 5;
        checklist.push("Certificate of MBA/MOT Degree");
    }
    // === Bonus 7: Japanese University Degree
    if(formData.japaneseUniDegree){
        points += 10;
        checklist.push("Graduation certificate from a Japanese university or graduate school");
    }
    // === Bonus 11: Specified University (MOJ)
    if(formData.specificUni){
        points += 10;
        checklist.push("Graduation certificate from university");
        checklist.push("Option 1: Screenshot of university ranking on QS World University Rankings, Times Higher Education: World University Rankings or ShanghaiRanking's Academic Ranking of World Universities. If foreign university, it is required to be in the top 300 for two or more rankings. If Japanese university, any rank in either one of the rankings is sufficient.");
        checklist.push("Option 2: Screenshot of website proving that the university receive subsidies under the Top Global University Project (Top Type and Globalization Leading Type) implemented by the Ministry of Education, Culture, Sports, Science and Technology");
        checklist.push("Option 3: Screenshot of document proving that the university is designated as a partner school in the Innovative Asia Project implemented by the Ministry of Foreign Affairs");
    }

    // === Work Experience Points ===
    switch(formData.category){
        case "academic":

            switch (formData.experience){
                case "7p":
                    points += 15;
                    break;
                case "5_6":
                    points += 10;
                    break;
                case "3_4":
                    points += 5;
                    break;
                default:
                    break;
            }
            break;
    
        case "technical":
            switch(formData.experience){
                case "10p":
                    points += 20;
                    break;
                case "7_9":
                    points += 15;
                    break;
                case "5_6":
                    points += 10;
                    break;
                case "3_4":
                    points += 5;
                    break;
                default:
                    break;
            }
            break;
    
        case "business":
            switch(formData.experience){
                case "10p":
                    points += 25;
                    break;
                case "7_9":
                    points += 20;
                    break;
                case "5_6":
                    points += 15;
                    break;
                case "3_4":
                    points += 10;
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
    }
    if(formData.experience){
        checklist.push("Proof of employment and work history");
    }
    if(formData.category === "business"){
        if(formData.companyPosition === "representative"){
            points += 10;
            checklist.push("Proof of company position as Representative Director or Executive Officer");
        }else if(formData.companyPosition === "director"){
            points += 5;
            checklist.push("Proof of company position as Director or Executive Officer");
        }
    }
    // === Bonus 4: Innovation Support Org
    if(formData.worksForGovSupportedOrg){
        points += 10;
        checklist.push("Document proving that company receives innovation promotion support measures, for example, a copy of a written notice of the granting of subsidy");
    
        // === Note 3: SME + Innovation Support
        if(formData.isSME){
            points += 10;
            checklist.push("Company brochure which its major business activities can be confirmed");
            checklist.push("Option 1: Documents proving the amount of stated capital or the total capital contribution amount");
            checklist.push("Option 1a: Certificate of registered matters of the corporation");
            checklist.push("Option 1b: Copy of a written settlement of accounts");
            checklist.push("Option 1c: Copy of the articles of incorporation, with which the amount of stated capital or the total capital contribution amount can be confirmed");
            checklist.push("Option 2: Document proving the number of employees, such as a copy of the emplyment insurance scheme, labor insurance scheme, or payroll book etc.");
        }
    }
    
    // === Bonus 5: SME with R&D > 3%
    if(formData.smeWithRAndDOver3Percent){
        points += 5;
        checklist.push("Option 1: Copies of financial statements containing research costs and sales amounts, etc.");
        checklist.push("Option 2: Copies of official documents containing sales amounts, copies of accounting records with research costs highlighted, and lists providing breakdowns of the research costs etc.");
        checklist.push("Option 3: Certificate prepared by an accountant, a certified public accountant, SME management consultant");
        checklist.push("");
    }
    
    // === Bonus 10: Growth Field Project
    if(formData.projectInGrowthField){
        points += 10;
        checklist.push("Proof of participation in a growth field project");
    }
    
    // === Bonus 14: Job Related to Investment Management (business or technical)
    if((formData.category === "business" || formData.category === "technical") && formData.jobRelatedToInvestment){
        points += 10;
        checklist.push("Proof of investment management responsibilities");
    }
    
    // === Bonus 15: MOJ-Designated Target Organization
    if(formData.targetOrganization){
        points += 10;
        checklist.push("Proof of employment at a target organization approved by the Minister of Justice");
    }


    // === Salary Points (Academic & Technical depends on age bracket) ===
    if(formData.category === "academic" || formData.category === "technical"){
        const salaryAgeMatrix = {
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
    
        const incomePoints = salaryAgeMatrix[formData.income]?.[formData.age] ?? 0;
    
        if(incomePoints > 0){
            points += incomePoints;
            checklist.push("Proof of income (e.g., tax certificate or salary slip)");
        }
    }
    // === Salary Points (Business category only)
    if(formData.category === "business"){
        const businessSalaryPoints = {
            "30p": 50,
            "25_30": 40,
            "20_25": 30,
            "15_20": 20,
            "10_15": 10,
            "u10": 0,
        };
    
        const pointsForIncome = businessSalaryPoints[formData.income] ?? 0;
    
        if(pointsForIncome > 0){
        points += pointsForIncome;
        checklist.push("Proof of income (e.g., company salary certificate)");
        } else {
        checklist.push("Income is below 10 million JPY (no points awarded)");
        }
    }
    // === Bonus Point 13: Investment ≥ 100M JPY
    if(formData.category === "business" && formData.businessInvestment){
        points += 5;
        checklist.push("Proof of investment of at least 100 million JPY");
    }

    // === Bonus Point 1: Research Achievements (academic/technical only) ===
    if(formData.category === "academic" || formData.category === "technical"){
        const researchSelectedCount = Object.values(formData.researchAchievements).filter(Boolean).length;
    
        if(formData.category === "academic"){
            if(researchSelectedCount >= 2){
                points += 25;
                checklist.push("At least two research achievements (e.g., patents, papers, grants)");
            } else if(researchSelectedCount === 1){
                points += 20;
                checklist.push("One research achievement (e.g., patent, grant, or paper)");
            }
        }
    
        if(formData.category === "technical" && researchSelectedCount >= 1){
        points += 15;
        checklist.push("Research achievement (e.g., patent, grant, or publication)");
        }
    
        if(researchSelectedCount > 0){
        checklist.push("Proof of research achievements");
        }
    }

    // === Bonus Point 3: National licenses ===
    if(formData.category === "technical"){
        if(formData.nationalCertificationNum === "2p"){
            points += 10;
            checklist.push("Proof of holding 2 or more national licenses");
        } else if(formData.nationalCertificationNum === "1"){
            points += 5;
            checklist.push("Proof of holding 1 national license");
        }
    }
    //Bonus Point 6: Foreign qualification ===
    if(formData.foreignWorkQualification){
        points += 5;
        checklist.push("Proof of foreign qualification related to the applicant’s work");
    }

    // === Japanese Proficiency ===
    if(formData.jlptLevel === "n1"){
        points += 15;
        checklist.push("Proof of JLPT N1 (or equivalent)");
        } else if(formData.jlptLevel === "n2" && !formData.japaneseUniDegree){
        // N2 bonus only applies if not already claiming points for Japanese university
        points += 10;
        checklist.push("Proof of JLPT N2 (or equivalent)");
    }

    if(formData.specificTraining){
        points += 5;
        checklist.push("Proof of MOJ-specified training completion (excluding Japanese university)");
    }

    // === Final Result ===
    if((formData.category === "academic" || formData.category === "technical") && formData.income === "u3"){
        message = "You need a minimum income of ￥3M to qualify. "
    } else if(points >= 80){
        message = "You qualify for HSP and may be eligible for PR after 1 year.";
    } else if(points >= 70){
        message = "You qualify for HSP and may be eligible for PR after 3 years.";
    } else{
        message = "You need at least 70 points to qualify.";
    }

    return { points, checklist, message };
}