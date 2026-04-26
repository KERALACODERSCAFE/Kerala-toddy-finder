  # Security Policy                                                                                                                                                           
                  
  ## Reporting a Vulnerability

  We take the security of Kerala Toddy Finder seriously. If you believe you have found a security vulnerability in this project, we encourage you to report it responsibly.   
   
  **Please do not open a public GitHub issue for security vulnerabilities.**                                                                                                  
                  
  ### How to Report                                                                                                                                                           
                  
  Send your findings by email to:                                                                                                                                             
                  
  **dan@buffersec.com**

  Use the subject line:                                                                                                                                                       
   
  **Security Vulnerability Disclosure for Kerala Toddy Finder Application**                                                                                                   
                  
  ### What to Include in Your Report                                                                                                                                          
   
  To help us triage and respond quickly, please include as much of the following as possible:                                                                                 
                  
  - **Description** — A clear summary of the vulnerability and its potential impact.                                                                                          
  - **Affected Component** — Which part of the application is affected (API endpoint, authentication flow, etc.).
  - **Steps to Reproduce** — A step-by-step walkthrough or proof-of-concept demonstrating the issue.                                                                          
  - **Environment** — Django version, Python version, OS, or any other relevant context.                                                                                      
  - **Suggested Fix** — (Optional) If you have a recommendation on how to address it.                                                                                         
                                                                                                                                                                              
  ### What to Expect
                                                                                                                                                                              
  - **Acknowledgement** — We will acknowledge your report within 48 hours.
  - **Investigation** — We will investigate and keep you informed of our progress.
  - **Resolution** — We aim to resolve critical issues within 7–14 days depending on complexity.                                                                              
  - **Credit** — With your consent, we will credit you in the changelog or release notes.                                                                                     
                                                                                                                                                                              
  ## Bug Bounty & Community Recognition                                                                                                                                       
                                                                                                                                                                              
  [Buffersec](https://buffersec.com) is a security-focused company and is happy to assist with any vulnerability reports submitted for this project.                          
                  
  - **Community Recognition** — Outstanding contributions will be highlighted as part of our best community effort recognition program.                                       
  - **Semgrep Collaboration** — With the researcher's and project admin's consent, noteworthy findings may be shared with the Semgrep team and the broader open-source
  security research community to help improve tooling and protect similar projects.                                                                                           
                                                                                                                                                                              
  ## Scope                                                                                                                                                                    
                                                                                                                                                                              
  The following are in scope for vulnerability reports:
                                                       
  - Authentication and authorization bypass
  - JWT token weaknesses                                                                                                                                                      
  - SQL injection or ORM query manipulation
  - File upload security issues                                                                                                                                               
  - Insecure Direct Object Reference (IDOR)                                                                                                                                   
  - Sensitive data exposure via API responses
  - RBAC enforcement failures                                                                                                                                                 
                                                                                                                                                                              
  ## Out of Scope
                                                                                                                                                                              
  - Denial of service attacks
  - Social engineering or phishing
  - Issues in third-party dependencies already publicly disclosed upstream
  - Reports against environments not owned or operated by this project                                                                                                        
                                                                                                                                                                              
  ## Supported Versions                                                                                                                                                       
                                                                                                                                                                              
  | Version | Supported |
  |---------|-----------|                                                                                                                                                     
  | Latest (`main` branch) | Yes |
  | Older branches | No |         
                                                                                                                                                                              
  ---
