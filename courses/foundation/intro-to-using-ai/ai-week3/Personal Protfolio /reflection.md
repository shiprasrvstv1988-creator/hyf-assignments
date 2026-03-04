1. Identify and share 3 new things you learned from AI in the above task:
   a) How to make a button change and reset a background image using JavaScript.
   b) How to organize sections in containers to create a clean 2x2 layout.
   c) How to stay focused on my main design plan and not get distracted by too many AI ideas.

2. Where did you have to tweak or correct Copilot’s suggestions to suit your needs?
   I had to correct Copilot’s suggestions when it placed the JavaScript code inside the HTML file. I asked it to create a separate JavaScript file instead, so my code would be cleaner and easier to manage.

3. How would you explain the difference between using Copilot to generate code for you vs. using it as an effective learning partner?
   Using Copilot to generate code is faster because it quickly writes and suggests the next line of codes for me vs. using it as a learning partner helps me understand the code better — how it works, when to use it and explore new ideas.

4. Identify 3 risks of relying too much on AI tools when learning at HackYourFuture.
   a) I can get lost in all the ideas and information AI gives me.
   b) Sometimes it makes things too complicated, even for simple tasks.
   c) I might not know how to fix things myself if there’s a bug or change needed.

# Using AI in development Assignment

# List of improvements from Part A:

# Improving Readability

I made the following two improvements to enhance readability:

1. Incorrect CSS Selectors:
   I was using the CSS selectors .core-skills and .technical-skills, but in my HTML the actual class names are .core and .technical. This made the CSS confusing because the styles were not being applied. I corrected the selectors so they now match the HTML class names.

2. Repeated <h2> Hierarchy:
   If .skills is already inside a section that uses an <h2> heading, then the headings inside it should move down one level to <h3>. Semantically, headings should follow a proper hierarchy (h2 → h3).
   Before(HTML):

<h2>Skills</h2>
<h2>Core Professional Skills</h2>
<h2>Technical Skills</h2>

After(HTML):

<h2>Skills</h2>
<h3>Core Professional Skills</h3>
<h3>Technical Skills</h3>

# Aligning with Best Practices

I made the following two improvements to better align with best practices:

1. Font Declared but Not Imported
   The Poppins font was declared in CSS but not imported. As a result, the browser fell back to a default system font. I fixed this by adding the Google Fonts link before style.css. This ensures the browser loads the font first, and then applies it correctly from the CSS.

2. Hardcoded Email as Plain Text
   The email address was written as plain text. A better practice is to use a mailto: link. This improves user experience (UX) by allowing users to directly open their email client when clicking the address.

# Solving a Potential Bug

Background Toggle Logic
In my JavaScript, the variable isOriginal was initially set to true. When the button was clicked for the first time, the condition checked isOriginal (which was true) and set the background to background.jpg, which was already the default image.
To fix this issue, I reversed the images inside the condition so that clicking the button changes the background to the alternate image instead of the default one.

# Improving Security

When using target="\_blank", it is best practice to also add rel="noopener noreferrer". This prevents a potential security risk where the newly opened page can access or control the original page.
\_blank - Open in new tab
noopener - Don’t let new tab control my page
noreferrer - Don’t tell the new site where user came from

# ASCII diagram to describe the structure of my portfolio project.

# Project Structure :

Personal Portfolio/
│
├── index.html
├── Style.css
├── script.js
├── reflection.md
└── Images/
├── background.jpg
├── background1.jpg
└── -2.jpg

# 3 new things I learned from the review and implementation process.

# Security Best Practices

I learned about the small but important security risk when using target="\_blank". Adding rel="noopener noreferrer" helps protect the original page from being accessed or controlled by the new page that opens. This was something I didn’t know before.

# Debugging and Problem-Solving Skills

I learned how to carefully check my code when something was not working as expected. For example, when fixing the background toggle bug, I had to analyze the logic of my JavaScript condition and understand why the default image was always being displayed before making changes.

# User Experience Improvements Matter

I learned that small details can improve user experience, such as using mailto: links instead of plain text email addresses, making it easier for users to contact me with one click.

# 3 ethical issues or risks associated with the use of AI in development:

# Protecting Confidential and Personal Data

One risk I learned about is accidentally sharing confidential or personal data with AI tools. If real customer information, passwords, or company code is pasted into AI tools, it could create privacy and security risks.
How I Will Mitigate This:
I will avoid using real personal or company data when using AI tools. Instead, I will use sample data when I am practicing or learning. I will also follow any company or course rules about using AI.

# Accuracy and AI Making Mistakes (Hallucinations)

Another risk is that AI can sometimes give incorrect or outdated information but present it confidently. This could lead to using wrong code or methods that don’t actually work.
How I Will Mitigate This:
I will always double-check AI suggestions using official documentation. I will also test any code I get from AI before using it in a real project, and I won’t just copy and paste without understanding it.

# Intellectual Property Risks

I learned that code used in a workplace may belong to an employer, so sharing work or proprietary code with external AI tools could violate company policies or confidentiality rules. This is important because companies often have specific rules about how their code can be used outside the organisation.
How I Will Mitigate This:
I will always check company or project policies before using AI tools with work-related code. I will avoid pasting any proprietary, confidential, or sensitive code into AI tools and will only use AI with personal projects or sample code when appropriate.
