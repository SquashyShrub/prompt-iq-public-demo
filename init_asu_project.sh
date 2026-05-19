#!/bin/bash
# ASU Software Engineering - Unified 'Clean Slate' Init Script

# 1. Generate Uniform Production Folder Tree
mkdir -p src docs/screenshots tests/Unit tests/Integration tests/Mocks

# 2. Inject Strategy Template (Hatch Notebook Blueprint)
cat << 'EOF' > docs/STRATEGY.md
# [TITLE OF IDEA]
# [TITLE OF IDEA]
**Date:** 2026-MM-DD  

---

### Description
- 

---

### Feature Set

#### Definite Features
- [ ] 
- [ ] 
- [ ] 

#### Possible Features
- [ ] 
- [ ] 
- [ ] 

---

### Market Analysis & Value

#### Market / Audience / Demand
- 

#### How Will It Add Value to People’s Lives?
- 

#### Does It Already Exist? If So, How Will It Be Better?
- 

---

### Project Evaluation

- **Excitement:** ⚪-⚪-⚪-⚪-⚪ (Replace with ⚫)
- **Difficulty:** ⚪-⚪-⚪-⚪-⚪ (Replace with ⚫)

---

### Execution Strategy

#### How Will It Be Made?
- 

#### Possible Challenges
- 

#### Resources Needed ($, People, etc.)
- 

#### Possible Spin-offs or Extensions
- 

---

### Mission Objectives

#### Why Should It Be Made?
- 

#### How Is Success Defined?
- 

#### Further Research
- 

---

### Roadmap
- [ ] **Phase 1**: 
- [ ] **Phase 2**: 
- [ ] **Phase 3**: 
- [ ] **Phase 4**:
EOF

# 3. Inject Technical Design Blueprint Template
cat << 'EOF' > docs/DESIGN.md
# [TITLE OF IDEA] - Technical Design Document  

---

### 1. The Value Proposition
- 

### 2. Implementation Roadmap
- **Languages/Frameworks**: 
- **Architectural Pattern**: 

### 3. Feature Set
- **Must-Haves**: 
	- [ ]
	- [ ]
	- [ ]
- **Future Extensions**: 
	- [ ]
	- [ ]
	- [ ]

### 4. Engineering Battle Plan
- **Challenge**: 
- **Solution**: 

### 5. Validation (Success Criteria)
- 

### 6. High Level Architecture
- [Image link]
EOF

# 4. Inject Aligned Public Facing Core README
cat << 'EOF' > README.md
# [Project Name]
**Current Version:** `v1.0.0-stable` | **Last Updated:** CURRENT_DATE  
> One sentence describing the core technical utility.

![Visual Proof Asset](docs/screenshot)

---

### Overview
Developed during my **[Semester/Year]** at Arizona State University. This project focuses on **[Core Concept: e.g., memory management / relational data / algorithm efficiency]**.

### Tech Stack
- **Language**: [e.g., C# / C++ / Java]
- **Frameworks/Tools**: [e.g., .NET Core / NUnit / MSSQL]
- **Environment**: [e.g., Visual Studio 2022 / Godot Engine]

### Key Features
- **[Feature 1]**: 
- **[Feature 2]**: 
- **[Feature 3]**: 

### Engineering Challenge
- **Problem:** 
- **Solution:** 

- **Problem:** 
- **Solution:** 

- **Problem:** 
- **Solution:** 

### Installation & Usage
1. Clone the repo: `git clone [url]`
2. Open in [IDE Name].
3. Press `F5` or `Run` to execute.

---
*Developed by [Your Name] as part of the ASU Software Engineering curriculum.*
EOF

# 5. Inject Master CHANGELOG File
cat << 'EOF' > CHANGELOG.md
# Changelog
All notable changes to this project will be documented in this file.

## [Unreleased]
- Planned: e.g. Target system features scheduled for the active sprint.
- Staged: e.g. Unit testing for core logic

## - CURRENT_DATE  |  version: 0.0.0
### Added
- **Feature**:
- **Docs**: 
EOF

# 6. Inject Enterprise-Grade .gitignore
cat << 'EOF' > .gitignore
[Bb]in/
[Oo]bj/
.vs/
.vscode/
*.user
*.suo
*.userosscache
*.sln.docuser
.DS_Store
Thumbs.db
*.tmp
*.log
*.class
*.jar
*.war
.classpath
.project
.settings/
EOF

# 7. Orchestrate System Dates and Hard Git Topologies
NOW_DATE=$(date +%Y-%m-%d)
sed -i "s/CURRENT_DATE/$NOW_DATE/g" docs/STRATEGY.md
sed -i "s/CURRENT_DATE/$NOW_DATE/g" docs/DESIGN.md
sed -i "s/CURRENT_DATE/$NOW_DATE/g" README.md
sed -i "s/CURRENT_DATE/$NOW_DATE/g" CHANGELOG.md

git init
git add .
git commit -m "infra: initialize clean-slate project layout, filters, and standard operating blueprints"
git branch -M main
git checkout -b dev

echo "==> SOP Deployment Success. Repository isolated on the 'dev' branch. Execution environment clear."
