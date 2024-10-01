const usernames = [
    'Aaran',
    'Aaren',
    'Aarez',
    'Aarman',
    'Aaron',
    'Aaron-James',
    'Aarron',
    'Aaryan',
    'Aaryn',
    'Aayan',
    'Aazaan',
    'Abaan',
    'Abbas',
    'Abdallah',
    'Abdalroof',
    'Abdihakim',
    'Abdirahman',
    'Abdisalam',
    'Abdul',
    'Abdul-Aziz',
    'Abdulbasir',
    'Abdulkadir',
    'Abdulkarem',
    'Smith',
    'Jones',
    'Coollastname',
    'enter_name_here',
    'Ze',
    'Zechariah',
    'Zeek',
    'Zeeshan',
    'Zeid',
    'Zein',
    'Zen',
    'Zendel',
    'Zenith',
    'Zennon',
    'Zeph',
    'Zerah',
    'Zhen',
    'Zhi',
    'Zhong',
    'Zhuo',
    'Zi',
    'Zidane',
    'Zijie',
    'Zinedine',
    'Zion',
    'Zishan',
    'Ziya',
    'Ziyaan',
    'Zohaib',
    'Zohair',
    'Zoubaeir',
    'Zubair',
    'Zubayr',
    'Zuriel',
    'Xander',
    'Jared',
    'Courtney',
    'Gillian',
    'Clark',
    'Jared',
    'Grace',
    'Kelsey',
    'Tamar',
    'Alex',
    'Mark',
    'Tamar',
    'Farish',
    'Sarah',
    'Nathaniel',
    'Parker',
  ];
  
  const emails = [
    'DecisionTracker@gmail.com',
    'FindPhone@gmail.com',
    'LearnPiano@gmail.com',
    'StarbaseDefender@gmail.com',
    'TowerDefense@gmail.com',
    'MonopolyManager@gmail.com',
    'Movietrailers@gmail.com',
    'Helloworld@gmail.com',
    'StupidMediaApp@gmail.com',
    'Notes@gmail.com',
    'Messages@gmail.com',
    'Email@gmail.com',
    'Compass@gmail.com',
    'Firefox@gmail.com',
    'Running@gmail.com',
    'Cooking@gmail.com',
    'Poker@gmail.com',
    'Deliveries@gmail.com',
  ];
  
  // Get a random item given an array
  const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
  
  // Gets a random full name
  const getRandomUsername = () =>
    `${getRandomArrItem(usernames)}`;
  
  // Function to generate random assignments that we can add to student object.
  const getRandomEmail = (int) => {
    const results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        email: getRandomArrItem(emails),
      });
    }
    return results;
  };
  
  // Export the functions for use in seed.js
  module.exports = { getRandomUsername, getRandomEmail };