// The After Five Toolkit: one entry per calculator.
// The Worker uses this to render /tools and /tools/<slug>. The calculators themselves
// live in public/costing-suite.html (the six costing tools) and public/assets/stack.js
// (Software Stack). If a formula changes there, update "how" here too.
//
// Regions: every tool except New employee is currency-neutral. New employee ships with
// New Zealand defaults only. Other regions stay "not yet available" until their payroll
// figures are checked against an official source; never fill them in from memory.

export const REGIONS = {
  NZ: { name: "New Zealand", status: "available", note: "KiwiSaver employer 3%, ACC levy 0.67%, holiday pay 8%. Defaults you can edit; check them against Inland Revenue, ACC and Employment New Zealand before relying on them." },
  US: { name: "United States", status: "planned" },
  AU: { name: "Australia", status: "planned" },
  UK: { name: "United Kingdom", status: "planned" }
};

export const TOOLS = [
  {
    slug: "start-up-costs",
    tab: "startup",
    name: "Start-up costs",
    question: "What will it cost to start my business?",
    title: "Start-up cost calculator",
    description: "Add up every one-off cost of opening your doors, then add a contingency buffer for the things that always come up.",
    helps: "Deciding how much money you need before you launch, and where most of it goes.",
    needs: ["A list of one-off costs: registration and legal, website and setup, equipment, branding, opening stock, deposits", "A rough amount for each (quotes beat guesses)", "How much buffer you want for surprises (it starts at 10%)"],
    how: ["Subtotal = the sum of every line you add.", "Contingency = subtotal × your buffer %.", "Total to launch = subtotal + contingency.", "It also tells you which category is the biggest slice."],
    includes: ["Every one-off cost you enter", "A percentage buffer on top"],
    excludes: ["Monthly running costs (use Monthly operating)", "Your own living costs while you get going (use Can I go full-time?)", "Tax, GST/VAT/sales tax and financing costs"],
    limits: "It's only as good as the list you give it. It doesn't know typical costs for your industry or location."
  },
  {
    slug: "bill-of-materials",
    tab: "bom",
    name: "Bill of materials",
    question: "Am I pricing my products correctly?",
    title: "Product pricing calculator (bill of materials)",
    description: "Work out what one unit really costs to make, including your time, then find the price that hits your target margin.",
    helps: "Setting a price that covers materials, your time and overhead, and still makes money.",
    needs: ["Each material or component, how many you use per unit and what each costs", "How many minutes one unit takes you", "What your time is worth per hour", "Packaging or overhead per unit", "The margin you're aiming for"],
    how: ["Materials = sum of (quantity × unit cost).", "Labour = minutes ÷ 60 × hourly rate.", "Cost per unit = materials + labour + overhead.", "Suggested price = cost per unit ÷ (1 − margin). Margin is capped at 94.9% so the maths stays sensible.", "Profit per unit = suggested price − cost per unit."],
    includes: ["Materials, your time and per-unit overhead", "Margin on the selling price (not markup on cost)"],
    excludes: ["Fixed monthly costs like rent (spread those yourself, or use Monthly operating)", "Marketplace, payment or shipping fees unless you add them as a line", "Sales tax, GST or VAT"],
    limits: "Margin and markup are different: a 50% margin means doubling your cost, not adding half. Check the suggested price against what customers will actually pay."
  },
  {
    slug: "monthly-operating-costs",
    tab: "opex",
    name: "Monthly operating",
    question: "What does it cost to run my business?",
    title: "Monthly operating cost calculator",
    description: "List your recurring running costs to see what you need to earn every month just to stand still.",
    helps: "Knowing your break-even point before profit, and which costs dominate.",
    needs: ["Every recurring cost, by category: premises, people, software, utilities, insurance, marketing", "The monthly amount for each (divide annual bills by 12)"],
    how: ["Monthly running cost = the sum of every line.", "Per year = monthly × 12.", "The breakdown shows your four biggest categories."],
    includes: ["Every recurring cost you enter, as a monthly amount"],
    excludes: ["One-off costs (use Start-up costs)", "Cost of the goods you sell (use Bill of materials)", "Tax on profit and loan repayments"],
    limits: "The \"break even\" figure here means covering running costs. It doesn't include what it costs to make what you sell."
  },
  {
    slug: "new-employee-cost",
    tab: "emp",
    name: "New employee",
    question: "Can I afford to hire someone?",
    title: "True cost of an employee calculator",
    description: "A wage is never the whole story. Add the employer on-costs, setup and extras to see what a hire really costs per year and per hour.",
    helps: "Deciding whether you can afford a hire, and what they cost all-in compared with their wage.",
    needs: ["Hourly rate and hours per week, or an annual salary", "Employer on-cost rates (pre-filled with New Zealand defaults)", "One-off setup: equipment, onboarding", "Other annual costs: software seats, phone, training"],
    how: ["Gross wage = hourly rate × hours per week × 52, or the salary you enter.", "On-costs = gross wage × (employer KiwiSaver % + ACC/levies % + holiday/leave %).", "True annual cost = gross wage + on-costs + other annual costs.", "First year = true annual cost + one-off setup.", "Effective hourly cost = true annual cost ÷ (hours per week × 52)."],
    includes: ["The on-cost percentages you enter, applied to the gross wage", "Setup and other annual costs you enter"],
    excludes: ["Employer payroll taxes outside New Zealand", "Sick leave, public holidays and overtime beyond what you put into the leave %", "Recruitment fees, redundancy and any tax effects"],
    limits: "Built around New Zealand employment. It isn't payroll or tax advice, and the default rates can change. Check them with Inland Revenue, ACC, Employment New Zealand or your accountant.",
    regional: true
  },
  {
    slug: "going-digital-costs",
    tab: "digital",
    name: "Going digital",
    question: "What will it cost to go digital?",
    title: "Going digital cost calculator",
    description: "Website, email, payments and tools, as recurring and one-off lines, so the subscriptions never surprise you.",
    helps: "Seeing the real first-year cost of moving a business online.",
    needs: ["Each tool or service, whether it's monthly or one-off, and its price"],
    how: ["Recurring = the sum of monthly lines.", "One-off = the sum of one-off lines.", "First-year total = one-off + recurring × 12.", "It also points out your biggest monthly line."],
    includes: ["Every recurring and one-off cost you enter"],
    excludes: ["Annual-only bills unless you divide them by 12", "Your own time setting things up", "Price rises after the first year"],
    limits: "Subscription prices change often and many have introductory rates. Use today's actual price, not the headline offer."
  },
  {
    slug: "can-i-go-full-time",
    tab: "leap",
    name: "Can I go full-time?",
    question: "Can I afford to go full-time?",
    title: "Can I afford to quit my job? calculator",
    description: "Put the pay and benefits you'd give up next to what the business costs to run, and see what you'd need to sell every month to cover it all.",
    helps: "Deciding whether, and when, to leave a job for your business.",
    needs: ["Your take-home pay per month", "The value of benefits you'd lose (retirement contributions, insurance, phone)", "Business running costs per month (it can pull this from Monthly operating)", "Your start-up cost (it can pull this from Start-up costs), and whether to spread it", "A tax and safety buffer %", "Your gross margin, and optionally your average sale"],
    how: ["Monthly start-up share = start-up cost ÷ months, only if you choose to spread it.", "Subtotal = take-home pay + lost benefits + running costs + start-up share.", "To cover = subtotal + subtotal × buffer %.", "Sales needed per month = to cover ÷ gross margin.", "Per week = monthly ÷ 4.333. Per working day = monthly ÷ 21.", "With an average sale, units = sales needed ÷ average sale, rounded up."],
    includes: ["Replacing your take-home pay, not your gross salary", "A single percentage buffer for tax and safety"],
    excludes: ["Your actual income tax (the buffer stands in for it)", "Seasonality and slow months", "Savings you might live on while you ramp up"],
    limits: "This is a target, not a forecast. It tells you what you'd need to sell, not whether you will."
  },
  {
    slug: "software-stack",
    name: "Software Stack",
    question: "What am I really paying for software?",
    title: "Software stack cost calculator",
    description: "List every subscription, group it by what it does, and see your monthly and annual total, plus where you might be paying twice for the same job.",
    helps: "Spotting subscriptions you've forgotten about and tools that overlap.",
    needs: ["Each app or subscription you pay for", "What it's for (accounting, email, design…)", "Its price and whether you pay monthly or yearly", "How many seats, if it charges per person"],
    how: ["Monthly cost of a tool = price × seats, divided by 12 if billed yearly.", "Monthly total = the sum of every tool. Annual total = monthly × 12.", "Tools are grouped by the job you said they do.", "Two or more tools in the same group are flagged as a possible overlap, for you to check."],
    includes: ["Every subscription you enter", "Per-seat pricing"],
    excludes: ["Free plans (add them at $0 if you want to see them grouped)", "Usage-based charges that change every month", "Taxes and currency conversion"],
    limits: "An overlap flag only means two tools share a job. Sometimes that's on purpose. It's a prompt to check, not a recommendation to cancel.",
    standalone: true
  }
];

export const toolBySlug = (slug) => TOOLS.find((t) => t.slug === slug);
