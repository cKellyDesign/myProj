module.exports = [
  {
    type: "Build",
    name: "Tenrox-R1_1235",
    owner: "",
    timeStarted: null,
    queueState: "Pending",
    metrics: {
      state: "Pending",
      test: 0,
      maintainability: 0,
      security: 0,
      workmanship: 0
    },
    build: {
      state: "Pending",
      fromBranch: "Debug",
      toBranch: "Release",
      finishTime: null
    },
    unitTest: {
      state: "Pending",
      testsPassed: 0,
      testsFailed: 0,
      coveragePercentage: 0
    },
    functionalTest: {
      state: "Pending",
      functionsPassed: 0,
      functionsFailed: 0,
      coveragePercentage: 0
    }
  },
  {
    type: "Firewall",
    name: "432462",
    owner: "jtuck",
    timeStarted: 1397823120000,
    queueState: "Running",
    metrics: {
      state: "Running",
      test: 0,
      maintainability: 0,
      security: 0,
      workmanship: 0
    },
    build: {
      state: "Pending",
      fromBranch: "Debug",
      toBranch: "Release",
      finishTime: null
    },
    unitTest: {
      state: "Pending",
      testsPassed: 0,
      testsFailed: 0,
      coveragePercentage: 0
    },
    functionalTest: {
      state: "Pending",
      functionsPassed: 0,
      functionsFailed: 0,
      coveragePercentage: 0
    }
  },
  {
    type: "Firewall",
    name: "432461",
    owner: "samy",
    timeStarted: 1397818380000,
    queueState: "Rejected",
    failReason: "Metrics Reduction",
    metrics: {
      state: "Rejected",
      test: 71,
      maintainability: 23,
      security: 64,
      workmanship: 48
    },
    build: {
      state: "Complete",
      fromBranch: "Debug",
      toBranch: "Release",
      finishTime: 1397818740000
    },
    unitTest: {
      state: "Complete",
      testsPassed: 81,
      testsFailed: 33,
      coveragePercentage: 94
    },
    functionalTest: {
      state: "Complete",
      functionsPassed: 4321,
      functionsFailed: 2145,
      coveragePercentage: 23
    }
  },
  {
    type: "Build",
    name: "Tenrox-R1_1234",
    owner: "",
    timeStarted: 1397727720000,
    queueState: "Complete",
    metrics: {
      state: "Complete",
      test: 71,
      maintainability: 23,
      security: 64,
      workmanship: 48
    },
    build: {
      state: "Complete",
      fromBranch: "Release",
      toBranch: "Production",
      finishTime: 1397728200000
    },
    unitTest: {
      state: "Complete",
      testsPassed: 156,
      testsFailed: 14,
      coveragePercentage: 94
    },
    functionalTest: {
      state: "Complete",
      functionsPassed: 5801,
      functionsFailed: 665,
      coveragePercentage: 68
    }
  },
  {
    type: "Firewall",
    name: "432460",
    owner: "samy",
    timeStarted: 1397721060000,
    queueState: "Rejected",
    failReason: "Metrics Reduction",
    metrics: {
      state: "Rejected",
      test: 33,
      maintainability: 18,
      security: 48,
      workmanship: 34
    },
    build: {
      state: "Cancelled",
      fromBranch: "Debug",
      toBranch: "Release",
      finishTime: null
    },
    unitTest: {
      state: "Cancelled",
      testsPassed: 0,
      testsFailed: 0,
      coveragePercentage: 0
    },
    functionalTest: {
      state: "Pending",
      functionsPassed: 0,
      functionsFailed: 0,
      coveragePercentage: 0
    }
  },
  {
    type: "Firewall",
    name: "432450",
    owner: "samy",
    timeStarted: 1397630580000,
    queueState: "Complete",
    metrics: {
      state: "Complete",
      test: 64,
      maintainability: 75,
      security: 64,
      workmanship: 72
    },
    build: {
      state: "Complete",
      fromBranch: "Debug",
      toBranch: "Release",
      finishTime: 1397630940000
    },
    unitTest: {
      state: "Complete",
      testsPassed: 156,
      testsFailed: 14,
      coveragePercentage: 94
    },
    functionalTest: {
      state: "Complete",
      functionsPassed: 5801,
      functionsFailed: 665,
      coveragePercentage: 68
    }
  }
];