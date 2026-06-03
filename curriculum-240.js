// MathEasy30 240-day curriculum data
// Safe source file only. It is not wired into the live app until app.html/app.js load it.
(function () {
  const levels = [
    {
      level: "A",
      range: "Days 1-30",
      title: "Starter number confidence",
      outcome: "Count, compare, add, subtract, notice groups, and understand early fractions with less fear.",
      topics: [
        "Counting forward", "Counting back", "Bigger and smaller", "Add one more", "Review",
        "Addition within five", "Addition within ten", "Doubles", "Make ten", "Addition review",
        "Take away one", "Subtraction within ten", "Missing parts", "Add and take away stories", "Subtraction review",
        "Equal groups", "Count by twos", "Count by fives", "Count by tens", "Multiplication intro review",
        "Sharing evenly", "Division by two", "Multiplication and division connection", "Division stories", "Division review",
        "Fractions equal parts", "Fractions in shapes", "Mixed review", "Confidence check", "Level A celebration"
      ]
    },
    {
      level: "B",
      range: "Days 31-60",
      title: "Addition and subtraction within 20",
      outcome: "Build accurate, calm addition and subtraction skills within 20 using strategies and stories.",
      topics: [
        "Number order to 20", "Compare to 20", "Add within 10", "Subtract within 10", "Add within 20 with objects",
        "Count on from bigger", "Make 10 strategy", "Doubles review", "Near doubles", "Count back subtraction",
        "Number line subtraction", "Missing addends", "Fact families", "Addition word problems", "Review",
        "Subtraction word problems", "Compare word problems", "Mental math", "Two-step within 20", "Error spotting",
        "Fluency practice", "Teen place value", "Tens and ones", "Add tens and ones", "Subtract from teens",
        "Mixed stories", "Math language", "Level B review", "Level B check", "Bridge to C"
      ]
    },
    {
      level: "C",
      range: "Days 61-90",
      title: "Place value and stronger operations",
      outcome: "Use place value, money, time, measurement, graphs, and two-step problem solving.",
      topics: [
        "Count to 100", "Place value to 100", "Compare two-digit numbers", "Add multiples of ten", "Subtract multiples of ten",
        "Two-digit plus one-digit", "Two-digit minus one-digit", "Two-digit addition", "Two-digit subtraction", "Regrouping concept",
        "Addition regrouping", "Subtraction regrouping", "Two-digit word problems", "Money coins", "Review",
        "Quarters and dollars", "Time hour and half hour", "Time quarter hour", "Length", "Weight and capacity",
        "Graphs", "Graph word problems", "Two-step word problems", "Estimation", "Mental math",
        "Error analysis", "Mixed operations", "Level C review", "Level C check", "Bridge to D"
      ]
    },
    {
      level: "D",
      range: "Days 91-120",
      title: "Multiplication and division foundations",
      outcome: "Build multiplication and division from equal groups, arrays, stories, area, and perimeter.",
      topics: [
        "Equal groups", "Repeated addition", "Arrays", "Multiply by two", "Multiply by five",
        "Multiply by ten", "Multiply by three", "Multiply by four", "Multiply by six", "Multiply by seven",
        "Multiply by eight", "Multiply by nine", "Fact families", "Division sharing", "Review",
        "Division grouping", "Division by two five and ten", "Division by three and four", "Remainders intro", "Multiplication stories",
        "Division stories", "Two-step group problems", "Area arrays", "Perimeter basics", "Mixed facts",
        "Error spotting", "Fluency without pressure", "Level D review", "Level D check", "Bridge to E"
      ]
    },
    {
      level: "E",
      range: "Days 121-150",
      title: "Fractions, measurement, and practical math",
      outcome: "Practice fractions, decimals, money, measurement, area, volume, and shopping math.",
      topics: [
        "Equal parts", "Unit fractions", "Non-unit fractions", "Number line fractions", "Equivalent fractions",
        "Compare same denominator", "Compare same numerator", "Add same denominator", "Subtract same denominator", "Mixed numbers",
        "Elapsed time", "Money operations", "Simple conversions", "Perimeter review", "Review",
        "Area rectangles", "Volume intro", "Line plots", "Fraction word problems", "Decimal tenths",
        "Decimal hundredths", "Compare decimals", "Add decimals money", "Subtract decimals money", "Shopping math",
        "Mixed practical review", "Error analysis", "Level E review", "Level E check", "Bridge to F"
      ]
    },
    {
      level: "F",
      range: "Days 151-180",
      title: "Decimals and multi-step problem solving",
      outcome: "Solve decimal, percent, graph, data, geometry, and multi-step problems with a plan.",
      topics: [
        "Decimal place value", "Order decimals", "Round decimals", "Add decimals", "Subtract decimals",
        "Multiply decimal by whole", "Divide decimal by whole", "Powers of ten", "Multi-step word problems", "Keywords caution",
        "Fractions to decimals", "Decimals to fractions", "Percent intro", "Friendly percents", "Review",
        "Coordinate plane intro", "Line graphs", "Mean median mode", "Range and outliers", "Angles intro",
        "Shapes", "Triangle area", "Volume prisms", "Unit conversions", "Measurement multi-step",
        "Error analysis", "Mixed solving", "Level F review", "Level F check", "Bridge to G"
      ]
    },
    {
      level: "G",
      range: "Days 181-210",
      title: "Ratios, percentages, integers, and expressions",
      outcome: "Work with ratios, unit rates, percents, integers, expressions, equations, proportions, and scale.",
      topics: [
        "Ratios intro", "Equivalent ratios", "Unit rates", "Percent review", "Percent of number",
        "Discounts", "Tax and tip", "Integers intro", "Compare integers", "Add integers",
        "Subtract integers", "Multiply and divide integers", "Absolute value", "Coordinate plane all quadrants", "Review",
        "Expressions intro", "Evaluate expressions", "Like terms", "Distributive property", "One-step equations with addition",
        "One-step equations with subtraction", "One-step equations with multiplication or division", "Inequalities intro", "Word problems with variables", "Proportions intro",
        "Scale drawings", "Error analysis", "Level G review", "Level G check", "Bridge to H"
      ]
    },
    {
      level: "H",
      range: "Days 211-240",
      title: "Pre-algebra and 8th-grade readiness",
      outcome: "Practice pre-algebra, functions, graphing, geometry, data, probability, financial math, and final review.",
      topics: [
        "Two-step equations", "Variables on both sides", "Two-step inequalities", "Functions intro", "Linear patterns",
        "Slope intro", "Graph lines", "Slope and starting value", "Systems visual", "Pythagorean intro",
        "Angle relationships", "Transformations", "Similarity", "Scientific notation", "Review",
        "Exponents", "Square roots", "Cylinder volume intro", "Scatter plots", "Probability",
        "Multi-step problems", "Real-life algebra", "Financial math", "Data interpretation", "Cumulative review A",
        "Cumulative review B", "Cumulative review C", "Final readiness practice", "Level H check", "Celebration"
      ]
    }
  ];

  function makeGoal(level, focus) {
    if (level === "A") return `Practice ${focus.toLowerCase()} with calm support and simple number thinking.`;
    if (level === "B") return `Build accurate addition and subtraction using ${focus.toLowerCase()}.`;
    if (level === "C") return `Use place value and practical math while practicing ${focus.toLowerCase()}.`;
    if (level === "D") return `Build multiplication and division foundations through ${focus.toLowerCase()}.`;
    if (level === "E") return `Use fractions, measurement, and real-life math with ${focus.toLowerCase()}.`;
    if (level === "F") return `Solve decimals, data, geometry, and multi-step work through ${focus.toLowerCase()}.`;
    if (level === "G") return `Practice middle-school math relationships with ${focus.toLowerCase()}.`;
    return `Work toward 8th-grade readiness using ${focus.toLowerCase()} and clear explanation.`;
  }

  window.MATHEASY240_LEVELS = levels;
  window.MATHEASY240_CURRICULUM = levels.flatMap((levelBlock, levelIndex) => {
    return levelBlock.topics.map((focus, topicIndex) => {
      const day = levelIndex * 30 + topicIndex + 1;
      return {
        day,
        level: levelBlock.level,
        range: levelBlock.range,
        levelTitle: levelBlock.title,
        levelOutcome: levelBlock.outcome,
        focus,
        goal: makeGoal(levelBlock.level, focus),
        minutes: 30,
        status: day <= 30 ? "starter-live" : "planned-next-path"
      };
    });
  });
})();
