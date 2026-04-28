import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // ── Modules ──────────────────────────────────────────────────────────────────
  const modules = await Promise.all([
    prisma.module.upsert({
      where: { slug: 'voter-registration' },
      update: {},
      create: {
        title: 'Voter Registration',
        slug: 'voter-registration',
        description: 'Learn how to register to vote and why it matters in a democracy.',
        type: 'process',
        difficultyLevel: 1,
        durationMinutes: 10,
        orderIndex: 1,
        tags: ['registration', 'basics', 'democracy'],
        content: {
          steps: [
            { title: 'Check Eligibility', body: 'You must be a citizen, at least 18 years old, and meet your state requirements.', icon: '✅' },
            { title: 'Gather Documents', body: 'Collect your ID, proof of address, and Social Security number.', icon: '📄' },
            { title: 'Complete Form', body: 'Fill out the voter registration form online or in person at your local election office.', icon: '📝' },
            { title: 'Submit & Confirm', body: 'Submit before the deadline (usually 30 days before election day) and confirm your registration status.', icon: '📬' },
          ],
          keyFacts: ['Registration deadlines vary by state', 'You can update registration when you move', 'Some states offer same-day registration'],
        },
      },
    }),
    prisma.module.upsert({
      where: { slug: 'candidate-nomination' },
      update: {},
      create: {
        title: 'Candidate Nomination',
        slug: 'candidate-nomination',
        description: 'Understand how candidates are nominated and what it takes to run for office.',
        type: 'process',
        difficultyLevel: 2,
        durationMinutes: 12,
        orderIndex: 2,
        tags: ['nomination', 'candidates', 'primaries'],
        content: {
          steps: [
            { title: 'Declare Candidacy', body: 'File official paperwork with the election authority and pay any required fees.', icon: '📢' },
            { title: 'Primary Elections', body: 'Compete in party primaries to secure the nomination from your political party.', icon: '🗳️' },
            { title: 'Campaign Launch', body: 'Begin organizing your campaign team, setting out your platform and messaging.', icon: '🚀' },
            { title: 'Ballot Qualification', body: 'Collect required signatures to appear on the general election ballot.', icon: '✍️' },
          ],
          keyFacts: ['Filing deadlines typically months before elections', 'Independent candidates follow different processes', 'Signature requirements vary by office level'],
        },
      },
    }),
    prisma.module.upsert({
      where: { slug: 'campaign-period' },
      update: {},
      create: {
        title: 'The Campaign Period',
        slug: 'campaign-period',
        description: 'Explore what happens during the campaign period and how campaigns work.',
        type: 'process',
        difficultyLevel: 2,
        durationMinutes: 15,
        orderIndex: 3,
        tags: ['campaign', 'advertising', 'debates'],
        content: {
          steps: [
            { title: 'Fundraising', body: 'Candidates raise money from donors subject to Federal Election Commission (FEC) rules.', icon: '💰' },
            { title: 'Campaigning', body: 'Door knocking, town halls, rallies and phone banking to reach voters.', icon: '📣' },
            { title: 'Debates', body: 'Scheduled debates allow candidates to present and defend their positions.', icon: '🎤' },
            { title: 'Advertising', body: 'TV, digital and print ads reach millions of voters in the final weeks.', icon: '📺' },
          ],
          keyFacts: ['Campaign finance is regulated by the FEC', 'Super PACs can raise unlimited funds for independent expenditures', 'Ads must include a "paid for by" disclosure'],
        },
      },
    }),
    prisma.module.upsert({
      where: { slug: 'voting-day' },
      update: {},
      create: {
        title: 'Voting Day',
        slug: 'voting-day',
        description: 'Everything you need to know about election day procedures and how to cast your ballot.',
        type: 'process',
        difficultyLevel: 1,
        durationMinutes: 8,
        orderIndex: 4,
        tags: ['voting', 'ballot', 'polling place'],
        content: {
          steps: [
            { title: 'Find Your Polling Place', body: 'Locate your assigned polling place using your state voter registration lookup tool.', icon: '📍' },
            { title: 'Bring Required ID', body: 'ID requirements vary by state. Check your local election board website.', icon: '🪪' },
            { title: 'Cast Your Ballot', body: 'Follow instructions at your polling place. Ask a poll worker if you need help.', icon: '🗳️' },
            { title: 'Check In', body: 'Sign the poll book and receive your ballot. Your information is verified here.', icon: '✅' },
          ],
          keyFacts: ['Polls are open for at least 12 hours in most states', 'You have the right to a provisional ballot if issues arise', 'Sample ballots are usually available before election day'],
        },
      },
    }),
    prisma.module.upsert({
      where: { slug: 'vote-counting' },
      update: {},
      create: {
        title: 'Vote Counting & Results',
        slug: 'vote-counting',
        description: 'Learn how votes are counted, certified, and how results are officially declared.',
        type: 'process',
        difficultyLevel: 3,
        durationMinutes: 15,
        orderIndex: 5,
        tags: ['counting', 'results', 'certification'],
        content: {
          steps: [
            { title: 'Closing Polls', body: 'Polls close at the designated time. Any voter already in line is allowed to vote.', icon: '🔒' },
            { title: 'Ballot Counting', body: 'Ballots are counted by optical scanners or hand counting, with bipartisan observers present.', icon: '🔢' },
            { title: 'Unofficial Results', body: 'Unofficial results are reported to media as counting progresses on election night.', icon: '📊' },
            { title: 'Certification', body: 'Official results are certified after all ballots (including mail-in) are counted and verified.', icon: '📜' },
          ],
          keyFacts: ['Mail ballots may take days to count', 'Recounts can be requested in close races', 'Results become official only after certification'],
        },
      },
    }),
    prisma.module.upsert({
      where: { slug: 'result-declaration' },
      update: {},
      create: {
        title: 'Result Declaration & Transition',
        slug: 'result-declaration',
        description: 'Understand the certification process, Electoral College, and peaceful transfer of power.',
        type: 'process',
        difficultyLevel: 3,
        durationMinutes: 12,
        orderIndex: 6,
        tags: ['certification', 'electoral college', 'transition'],
        content: {
          steps: [
            { title: 'State Certification', body: 'Each state certifies its results and officially declares winning candidates.', icon: '🏛️' },
            { title: 'Electoral College', body: 'For presidential elections, electors cast votes based on state results.', icon: '⭐' },
            { title: 'Congressional Count', body: 'Congress certifies the Electoral College vote on January 6th.', icon: '🏛️' },
            { title: 'Inauguration', body: 'The winner is inaugurated and takes the oath of office to begin their term.', icon: '🤝' },
          ],
          keyFacts: ['A presidential candidate needs 270 Electoral votes to win', 'Disputes can be challenged in court', 'Inauguration Day is January 20th for presidents'],
        },
      },
    }),
    prisma.module.upsert({
      where: { slug: 'dispute-resolution' },
      update: {},
      create: {
        title: 'Dispute Resolution',
        slug: 'dispute-resolution',
        description: 'How election disputes, recounts, and legal challenges are handled.',
        type: 'process',
        difficultyLevel: 4,
        durationMinutes: 10,
        orderIndex: 7,
        tags: ['disputes', 'recounts', 'legal'],
        content: {
          steps: [
            { title: 'Recount Requests', body: 'Losing candidates may request a recount if results are within a certain margin.', icon: '🔄' },
            { title: 'Legal Challenges', body: 'Election results can be challenged in court if there is evidence of fraud or irregularities.', icon: '⚖️' },
            { title: 'Administrative Appeals', body: 'Voters can appeal decisions about ballot rejection to election boards.', icon: '📋' },
            { title: 'Resolution', body: 'Courts issue binding decisions; election boards certify final results.', icon: '✅' },
          ],
          keyFacts: ['Recounts rarely change outcomes by large margins', 'Legal challenges must provide evidence', 'States have different recount thresholds'],
        },
      },
    }),
  ]);

  console.log(`✅ Created ${modules.length} modules`);

  // ── Timeline Events ───────────────────────────────────────────────────────────
  const today = new Date();
  const y = today.getFullYear();

  const events = await prisma.timelineEvent.createMany({
    skipDuplicates: true,
    data: [
      { title: 'Voter Registration Opens', description: 'Registration portals open for the upcoming election cycle. Citizens can register online, by mail, or in person.', eventDate: new Date(`${y}-01-15`), eventType: 'registration', importanceLevel: 3, country: 'general', color: '#2E5090', icon: '📋' },
      { title: 'Candidate Filing Deadline', description: 'Deadline for candidates to officially file with election authorities and submit required documentation.', eventDate: new Date(`${y}-02-01`), eventType: 'nomination', importanceLevel: 3, country: 'general', color: '#2D8A3F', icon: '📝' },
      { title: 'Primary Elections Begin', description: 'Political parties hold primary elections to select their candidates for the general election.', eventDate: new Date(`${y}-03-05`), eventType: 'voting', importanceLevel: 4, country: 'general', color: '#FFB81C', icon: '🗳️' },
      { title: 'Presidential Primary Season', description: 'Super Tuesday — multiple states hold simultaneous primaries, a major milestone in the nomination process.', eventDate: new Date(`${y}-03-05`), eventType: 'voting', importanceLevel: 5, country: 'general', color: '#FFB81C', icon: '⭐' },
      { title: 'Campaign Finance Deadline', description: 'Quarterly campaign finance reports must be filed with the FEC, disclosing all donations and expenditures.', eventDate: new Date(`${y}-04-15`), eventType: 'campaign', importanceLevel: 2, country: 'general', color: '#3498DB', icon: '💰' },
      { title: 'Party Conventions', description: 'Major political parties hold conventions to formally nominate their presidential and vice-presidential candidates.', eventDate: new Date(`${y}-07-15`), eventType: 'nomination', importanceLevel: 4, country: 'general', color: '#2D8A3F', icon: '🎉' },
      { title: 'Presidential Debates', description: 'General election debates between major party candidates broadcast nationwide, watched by millions of voters.', eventDate: new Date(`${y}-09-10`), eventType: 'campaign', importanceLevel: 4, country: 'general', color: '#9B59B6', icon: '🎤' },
      { title: 'Voter Registration Deadline', description: 'Last day for voters to register in most states. Check your state\'s specific deadline as it varies.', eventDate: new Date(`${y}-10-07`), eventType: 'registration', importanceLevel: 5, country: 'general', color: '#E74C3C', icon: '⚠️' },
      { title: 'Early Voting Begins', description: 'Many states open early voting locations allowing registered voters to cast ballots before election day.', eventDate: new Date(`${y}-10-15`), eventType: 'voting', importanceLevel: 3, country: 'general', color: '#2E5090', icon: '🗳️' },
      { title: 'Mail Ballot Request Deadline', description: 'Last day to request a mail-in or absentee ballot in most states. Plan ahead to ensure your ballot arrives on time.', eventDate: new Date(`${y}-10-25`), eventType: 'voting', importanceLevel: 4, country: 'general', color: '#E74C3C', icon: '✉️' },
      { title: 'Election Day', description: 'The main election day. Polls are open across the country. Exercise your right to vote!', eventDate: new Date(`${y}-11-05`), eventType: 'voting', importanceLevel: 5, country: 'general', color: '#E74C3C', icon: '🗳️' },
      { title: 'Unofficial Results Announced', description: 'Media networks and election authorities begin reporting unofficial results as votes are counted throughout election night.', eventDate: new Date(`${y}-11-05`), eventType: 'results', importanceLevel: 4, country: 'general', color: '#E67E22', icon: '📊' },
      { title: 'Mail Ballot Counting Deadline', description: 'Most states count mail ballots postmarked by election day. This can extend counting by several days.', eventDate: new Date(`${y}-11-10`), eventType: 'counting', importanceLevel: 3, country: 'general', color: '#27AE60', icon: '📬' },
      { title: 'State Certification Deadline', description: 'States certify their official election results, making them legally binding.', eventDate: new Date(`${y}-11-30`), eventType: 'results', importanceLevel: 4, country: 'general', color: '#27AE60', icon: '📜' },
      { title: 'Electoral College Vote', description: 'Presidential electors meet in their state capitals to cast official Electoral College votes.', eventDate: new Date(`${y}-12-17`), eventType: 'results', importanceLevel: 5, country: 'general', color: '#2E5090', icon: '⭐' },
      { title: 'Congressional Certification', description: 'Congress meets in joint session to certify the Electoral College results and officially declare the winner.', eventDate: new Date(`${y + 1}-01-06`), eventType: 'results', importanceLevel: 5, country: 'general', color: '#2E5090', icon: '🏛️' },
      { title: 'Inauguration Day', description: 'The President-elect is inaugurated and sworn into office, marking the official peaceful transfer of power.', eventDate: new Date(`${y + 1}-01-20`), eventType: 'results', importanceLevel: 5, country: 'general', color: '#FFB81C', icon: '🤝' },
    ],
  });

  console.log('✅ Created timeline events');

  // ── Quizzes ───────────────────────────────────────────────────────────────────
  const registrationModule = modules.find((m) => m.slug === 'voter-registration')!;
  const votingModule = modules.find((m) => m.slug === 'voting-day')!;
  const countingModule = modules.find((m) => m.slug === 'vote-counting')!;

  const q1 = await prisma.quiz.upsert({
    where: { id: 'quiz-registration-001' },
    update: {},
    create: {
      id: 'quiz-registration-001',
      moduleId: registrationModule.id,
      title: 'Voter Registration Quiz',
      description: 'Test your knowledge about voter registration requirements and processes.',
      passingScore: 70,
      questions: {
        create: [
          { questionText: 'What is the minimum age to vote in federal elections in the US?', questionType: 'multiple_choice', orderIndex: 1, explanation: 'The 26th Amendment (1971) lowered the voting age to 18 for all federal, state, and local elections.', options: [{ id: 'a', text: '16 years old', isCorrect: false }, { id: 'b', text: '18 years old', isCorrect: true }, { id: 'c', text: '21 years old', isCorrect: false }, { id: 'd', text: '25 years old', isCorrect: false }] },
          { questionText: 'How many days before an election must you typically register to vote?', questionType: 'multiple_choice', orderIndex: 2, explanation: 'Most states require registration 15–30 days before an election, though some allow same-day registration.', options: [{ id: 'a', text: '3 days', isCorrect: false }, { id: 'b', text: '7 days', isCorrect: false }, { id: 'c', text: '30 days', isCorrect: true }, { id: 'd', text: '60 days', isCorrect: false }] },
          { questionText: 'Can you register to vote if you are a permanent legal resident (green card holder)?', questionType: 'multiple_choice', orderIndex: 3, explanation: 'Only U.S. citizens are eligible to vote in federal elections. Permanent residents cannot register or vote.', options: [{ id: 'a', text: 'Yes, always', isCorrect: false }, { id: 'b', text: 'Yes, in local elections only', isCorrect: false }, { id: 'c', text: 'No, only U.S. citizens can vote', isCorrect: true }, { id: 'd', text: 'Only after 5 years of residency', isCorrect: false }] },
          { questionText: 'What should you do if you move to a new address before an election?', questionType: 'multiple_choice', orderIndex: 4, explanation: 'When you move, you should update your voter registration to reflect your new address to ensure you can vote in your correct precinct.', options: [{ id: 'a', text: 'Nothing — old registration is still valid', isCorrect: false }, { id: 'b', text: 'Update your voter registration', isCorrect: true }, { id: 'c', text: 'Register as a new voter only after 6 months', isCorrect: false }, { id: 'd', text: 'You lose your voting rights when you move', isCorrect: false }] },
          { questionText: 'True or False: Voter registration is a one-time process that never needs to be updated.', questionType: 'multiple_choice', orderIndex: 5, explanation: 'FALSE. Registration needs updating when you move, change your name, or re-register after inactivity in some states.', options: [{ id: 'a', text: 'True', isCorrect: false }, { id: 'b', text: 'False', isCorrect: true }] },
        ],
      },
    },
  });

  const q2 = await prisma.quiz.upsert({
    where: { id: 'quiz-voting-day-001' },
    update: {},
    create: {
      id: 'quiz-voting-day-001',
      moduleId: votingModule.id,
      title: 'Election Day Quiz',
      description: 'What do you know about voting day procedures and your rights at the polls?',
      passingScore: 70,
      questions: {
        create: [
          { questionText: 'What is a "polling place"?', questionType: 'multiple_choice', orderIndex: 1, explanation: 'A polling place is the official location where registered voters in a precinct go to cast their ballots on election day.', options: [{ id: 'a', text: 'A website where you vote online', isCorrect: false }, { id: 'b', text: 'The location where registered voters cast their ballots', isCorrect: true }, { id: 'c', text: 'The headquarters of a political party', isCorrect: false }, { id: 'd', text: 'A place where election results are announced', isCorrect: false }] },
          { questionText: 'What is a provisional ballot?', questionType: 'multiple_choice', orderIndex: 2, explanation: 'A provisional ballot is used when there is a question about a voter\'s eligibility. It is counted after election officials verify the voter\'s registration.', options: [{ id: 'a', text: 'A ballot used by absentee voters', isCorrect: false }, { id: 'b', text: 'A ballot cast when there are questions about voter eligibility', isCorrect: true }, { id: 'c', text: 'A ballot for candidates who are not on the main ticket', isCorrect: false }, { id: 'd', text: 'An early voting ballot', isCorrect: false }] },
          { questionText: 'If you are in line when the polls close, what happens?', questionType: 'multiple_choice', orderIndex: 3, explanation: 'Federal and state law generally guarantees that if you are in line when polls close, you are entitled to vote.', options: [{ id: 'a', text: 'You are turned away', isCorrect: false }, { id: 'b', text: 'You must return the next day', isCorrect: false }, { id: 'c', text: 'You are still allowed to vote', isCorrect: true }, { id: 'd', text: 'You receive a mail ballot', isCorrect: false }] },
          { questionText: 'What does "straight-ticket voting" mean?', questionType: 'multiple_choice', orderIndex: 4, explanation: 'Straight-ticket voting allows voters to vote for all candidates from one party with a single selection, rather than choosing candidates individually.', options: [{ id: 'a', text: 'Voting only for presidential candidates', isCorrect: false }, { id: 'b', text: 'Voting for all candidates of one political party', isCorrect: true }, { id: 'c', text: 'Voting in person only, not by mail', isCorrect: false }, { id: 'd', text: 'Voting for candidates from multiple parties', isCorrect: false }] },
          { questionText: 'What should you bring to vote in most states that require photo ID?', questionType: 'multiple_choice', orderIndex: 5, explanation: 'Accepted photo IDs typically include a driver\'s license, state ID card, passport, or military ID. Requirements vary by state.', options: [{ id: 'a', text: 'Credit card', isCorrect: false }, { id: 'b', text: 'Voter registration card only', isCorrect: false }, { id: 'c', text: 'Government-issued photo ID', isCorrect: true }, { id: 'd', text: 'Birth certificate', isCorrect: false }] },
        ],
      },
    },
  });

  const q3 = await prisma.quiz.upsert({
    where: { id: 'quiz-counting-001' },
    update: {},
    create: {
      id: 'quiz-counting-001',
      moduleId: countingModule.id,
      title: 'Vote Counting & Results Quiz',
      description: 'Test your understanding of how votes are counted and results certified.',
      passingScore: 70,
      questions: {
        create: [
          { questionText: 'What is the purpose of having bipartisan observers during vote counting?', questionType: 'multiple_choice', orderIndex: 1, explanation: 'Bipartisan observers from multiple parties ensure transparency and integrity in the counting process, building public trust in the results.', options: [{ id: 'a', text: 'To speed up the counting process', isCorrect: false }, { id: 'b', text: 'To ensure transparency and prevent errors or fraud', isCorrect: true }, { id: 'c', text: 'To determine which party wins', isCorrect: false }, { id: 'd', text: 'To manage voter registration', isCorrect: false }] },
          { questionText: 'Why might it take days to announce final election results?', questionType: 'multiple_choice', orderIndex: 2, explanation: 'Mail-in and absentee ballots, provisional ballots, and ballots from remote locations all take additional time to collect and count.', options: [{ id: 'a', text: 'Election officials work slowly on purpose', isCorrect: false }, { id: 'b', text: 'Mail ballots, provisionals, and verification processes take additional time', isCorrect: true }, { id: 'c', text: 'Results must be approved by the president first', isCorrect: false }, { id: 'd', text: 'Computers need time to process results', isCorrect: false }] },
          { questionText: 'What does "certifying" election results mean?', questionType: 'multiple_choice', orderIndex: 3, explanation: 'Certification is the official process by which election authorities legally confirm the accuracy of results and declare them the final, binding outcome.', options: [{ id: 'a', text: 'Announcing preliminary exit poll results', isCorrect: false }, { id: 'b', text: 'Officially confirming and legally recognizing the final vote count', isCorrect: true }, { id: 'c', text: 'Sending ballots to voters by mail', isCorrect: false }, { id: 'd', text: 'Starting a recount automatically', isCorrect: false }] },
          { questionText: 'In what circumstances is a recount typically triggered?', questionType: 'multiple_choice', orderIndex: 4, explanation: 'Automatic recounts are typically triggered when the margin of victory is below a set threshold (often less than 0.5%). Candidates may also request recounts.', options: [{ id: 'a', text: 'After every election automatically', isCorrect: false }, { id: 'b', text: 'When requested by any losing candidate', isCorrect: false }, { id: 'c', text: 'When results are very close, often within a small margin like 0.5%', isCorrect: true }, { id: 'd', text: 'When observers disagree about results', isCorrect: false }] },
          { questionText: 'How many Electoral College votes does a presidential candidate need to win?', questionType: 'multiple_choice', orderIndex: 5, explanation: 'There are 538 total electoral votes. A candidate needs a majority — 270 electoral votes — to win the presidency.', options: [{ id: 'a', text: '269', isCorrect: false }, { id: 'b', text: '270', isCorrect: true }, { id: 'c', text: '300', isCorrect: false }, { id: 'd', text: '538', isCorrect: false }] },
        ],
      },
    },
  });

  console.log('✅ Created 3 quizzes with questions');

  // ── FAQ Items ─────────────────────────────────────────────────────────────────
  await prisma.faqItem.createMany({
    skipDuplicates: true,
    data: [
      { question: 'How do I register to vote?', answer: 'You can register online at vote.gov, by mail using your state\'s voter registration form, or in person at your local election office, DMV, or other government agency.', category: 'Registration', orderIndex: 1 },
      { question: 'What is the deadline to register to vote?', answer: 'Deadlines vary by state, but most states require registration 15–30 days before an election. Some states offer same-day registration. Check vote.gov for your state\'s deadline.', category: 'Registration', orderIndex: 2 },
      { question: 'Do I need ID to vote?', answer: 'ID requirements vary by state. About 35 states have voter ID laws. Accepted IDs typically include a driver\'s license, state ID, passport, or military ID. Check your state\'s requirements.', category: 'Voting', orderIndex: 1 },
      { question: 'What is early voting?', answer: 'Early voting allows registered voters to cast ballots before election day at designated locations. Most states offer early voting; the period typically starts 2–4 weeks before election day.', category: 'Voting', orderIndex: 2 },
      { question: 'How do I vote by mail?', answer: 'To vote by mail (absentee voting), request an absentee ballot from your state election office before the deadline (usually 7–10 days before election day). Complete and return the ballot by the deadline.', category: 'Voting', orderIndex: 3 },
      { question: 'What happens if I make a mistake on my ballot?', answer: 'If you have not submitted your ballot yet, ask poll workers for a new ballot (this is called "spoiling" your ballot). They will invalidate the old one and give you a fresh one.', category: 'Voting', orderIndex: 4 },
      { question: 'How are votes counted?', answer: 'Most votes are counted by optical scan machines that read marked paper ballots. Some jurisdictions use hand counting. All counting is done with bipartisan observers present to ensure accuracy.', category: 'Counting', orderIndex: 1 },
      { question: 'Why does it take so long to count votes?', answer: 'Mail-in and absentee ballots, which are numerous, take time to verify and count. Provisional ballots need additional verification. Some states cannot begin counting mail ballots until election day itself.', category: 'Counting', orderIndex: 2 },
      { question: 'What is the Electoral College?', answer: 'The Electoral College is a body of 538 electors who formally elect the President and Vice President. Each state gets electors equal to its total Congressional representation. A candidate needs 270 to win.', category: 'Process', orderIndex: 1 },
      { question: 'What is a primary election?', answer: 'A primary election is held to determine which candidate will represent a political party in the general election. Voters choose among candidates from the same party.', category: 'Process', orderIndex: 2 },
      { question: 'Can I take time off work to vote?', answer: 'Most states have laws requiring employers to give employees time off to vote. The number of paid hours varies by state. Check your state\'s election laws or your employee handbook.', category: 'Voting', orderIndex: 5 },
      { question: 'What is a polling place?', answer: 'A polling place (or polling station) is the official location where voters in a precinct go to cast their ballots on election day. Your polling place is determined by your registered address.', category: 'Voting', orderIndex: 6 },
    ],
  });

  console.log('✅ Created FAQ items');

  // ── Glossary Terms ────────────────────────────────────────────────────────────
  await prisma.glossaryTerm.createMany({
    skipDuplicates: true,
    data: [
      { term: 'Absentee Ballot', definition: 'A ballot that allows a voter to participate in an election without going to a polling place in person. It can be requested and submitted by mail.', example: 'Military personnel overseas often vote using absentee ballots.', category: 'Voting' },
      { term: 'Ballot Initiative', definition: 'A process that allows voters to vote directly on proposed laws or constitutional amendments, bypassing the legislature.', example: 'Voters approved a ballot initiative to legalize recreational marijuana.', category: 'Process' },
      { term: 'Bipartisan', definition: 'Involving cooperation between two major political parties.', example: 'Vote counting is conducted by bipartisan teams of observers to ensure fairness.', category: 'General' },
      { term: 'Canvassing', definition: 'The systematic process of going door-to-door or contacting voters to discuss candidates or issues and encourage voter participation.', example: 'Campaign volunteers spent the weekend canvassing neighborhoods.', category: 'Campaign' },
      { term: 'Caucus', definition: 'A meeting of members of a political party in which they discuss and vote on candidates, policies, or other party matters.', example: 'Iowa holds caucuses at the start of the presidential primary season.', category: 'Process' },
      { term: 'Certification', definition: 'The official process of verifying and legally recognizing election results as final and binding.', example: 'The Secretary of State certified the election results on November 30th.', category: 'Counting' },
      { term: 'Constituency', definition: 'A group of voters in a geographical area who elect a representative to a legislative body.', example: 'The senator works to address the concerns of her constituency.', category: 'General' },
      { term: 'Delegate', definition: 'A person authorized to represent others at a political convention or meeting and vote on their behalf.', example: 'Each state sends delegates to the party\'s national convention.', category: 'Process' },
      { term: 'Electoral College', definition: 'A body of electors established by the U.S. Constitution who formally elect the President and Vice President using votes allocated to each state.', example: 'A candidate needs 270 electoral votes to win the presidency.', category: 'Process' },
      { term: 'Gerrymandering', definition: 'The practice of manipulating electoral district boundaries to favor a particular party or group.', example: 'Critics argued the new district map was gerrymandered to benefit one party.', category: 'General' },
      { term: 'Incumbent', definition: 'A person who currently holds a political office and is seeking re-election.', example: 'The incumbent senator won re-election by a comfortable margin.', category: 'General' },
      { term: 'Precinct', definition: 'A subdivision of a city or county used as a unit for organizing and administering elections.', example: 'Each precinct has a designated polling place for its registered voters.', category: 'Voting' },
      { term: 'Primary Election', definition: 'An election in which voters of each political party choose candidates to represent the party in a subsequent general election.', example: 'She won the Democratic primary before facing her Republican opponent.', category: 'Process' },
      { term: 'Provisional Ballot', definition: 'A ballot used to record a vote when there are questions about a voter\'s eligibility. It is counted after officials verify registration.', example: 'He was given a provisional ballot when his name was not on the voter roll.', category: 'Voting' },
      { term: 'Recount', definition: 'A second count of votes in an election, usually conducted when results are very close and may be contested.', example: 'A recount was requested since the margin of victory was less than 0.1%.', category: 'Counting' },
      { term: 'Runoff Election', definition: 'An election held after a general election when no candidate wins the required majority in the first round.', example: 'No candidate won 50% of votes, so a runoff election was scheduled.', category: 'Process' },
      { term: 'Swing State', definition: 'A state where both major political parties have similar levels of support, making it crucial in determining election outcomes.', example: 'Both campaigns focused heavily on swing states like Pennsylvania and Michigan.', category: 'General' },
      { term: 'Voter Suppression', definition: 'Strategies that discourage or prevent specific groups of people from exercising their right to vote.', example: 'Closing polling places in minority neighborhoods was seen as voter suppression.', category: 'General' },
      { term: 'Write-In Candidate', definition: 'A candidate whose name does not appear on the printed ballot; voters must write in the candidate\'s name manually.', example: 'Some voters cast write-in votes for candidates not on the official ballot.', category: 'Voting' },
    ],
  });

  console.log('✅ Created glossary terms');
  console.log('\n🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
