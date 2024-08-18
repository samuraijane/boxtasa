const categories = {
  scheduleA: {
    name: "Schedule A",
    subcategories: [
      {
        ids: [71],
        name: "Charity"
      },
      {
        ids: [73],
        name: "Job expenses"
      },
      {
        ids: [72],
        name: "Losses"
      },
      {
        ids: [69],
        name: "Medical"
      },
      {
        ids: [77],
        name: "Mortgage Interest"
      },
      {
        ids: [74],
        name: "Other"
      },
      {
        ids: [70],
        name: "Taxes Paid"
      }
    ]
  },
  scheduleB: {
    name: "Schedule B",
    subcategories: [
      {
        ids: [76],
        name: "Dividends"
      },
      {
        ids: [75],
        name: "Interest"
      }
    ]
  },
  scheduleC: {
    name: "Schedule C",
    subcategories: [
      {
        ids: [27],
        name: "Advertising"
      },
      {
        ids: [64],
        name: "Books"
      },
      {
        ids: [28],
        name: "Car/Truck"
      },
      {
        ids: [29],
        name: "Commission/Fees"
      },
      {
        ids: [65],
        name: "Conferences"
      },
      {
        ids: [63],
        name: "Continuing Education"
      },
      {
        ids: [30],
        name: "Contract labor"
      },
      {
        ids: [31],
        name: "Depletion"
      },
      {
        ids: [32],
        name: "Depreciation"
      },
      {
        ids: [33],
        name: "Employee Benefit"
      },
      {
        ids: [26],
        name: "Gross Receipts"
      },
      {
        ids: [34],
        name: "Insurance"
      },
      {
        ids: [35],
        name: "Interest"
      },
      {
        ids: [36],
        name: "Legal/Professional"
      },
      {
        ids: [37],
        name: "Office"
      },
      {
        ids: [61],
        name: "Other Equipment"
      },
      {
        ids: [62],
        name: "Other Software"
      },
      {
        ids: [38],
        name: "Pension"
      },
      {
        ids: [39],
        name: "Rent"
      },
      {
        ids: [40],
        name: "Repairs/Maintenance"
      },
      {
        ids: [41],
        name: "Supplies"
      },
      {
        ids: [42],
        name: "Taxes/Licenses"
      },
      {
        ids: [43],
        name: "Travel/Meals"
      },
      {
        ids: [44],
        name: "Utilities"
      },
      {
        ids: [45],
        name: "Wages"
      }
    ]
  },
  scheduleE: {
    name: "Schedule E",
    subcategories: [
      {
        ids: [47],
        name: "Advertising"
      },
      {
        ids: [66],
        name: "Appliances"
      },
      {
        ids: [48],
        name: "Auto/Travel"
      },
      {
        ids: [49],
        name: "Cleaning/Maintenance"
      },
      {
        ids: [50],
        name: "Commissions"
      },
      {
        ids: [60],
        name: "Depreciation"
      },
      {
        ids: [51],
        name: "Insurance"
      },
      {
        ids: [52],
        name: "Legal/Professional"
      },
      {
        ids: [68],
        name: "Lodging"
      },
      {
        ids: [53],
        name: "Management Fees"
      },
      {
        ids: [67],
        name: "Meals"
      },
      {
        ids: [54],
        name: "Mortgage Interest"
      },
      {
        ids: [55],
        name: "Other Interest"
      },
      {
        ids: [46],
        name: "Rents Received"
      },
      {
        ids: [56],
        name: "Repairs"
      },
      {
        ids: [57],
        name: "Supplies"
      },
      {
        ids: [58],
        name: "Taxes"
      },
      {
        ids: [59],
        name: "Utilities"
      }
    ]
  }
};

const reportConfig = [
  {
    ...categories.scheduleA
  },
  {
    ...categories.scheduleB
  },
  {
    name: "Schedule C - Julie",
    subcategories: categories.scheduleC.subcategories,
    qualifiers: [19]
  },
  {
    name: "Schedule C - Matthew",
    subcategories: categories.scheduleC.subcategories,
    qualifiers: [20]
  },
  {
    name: "Schedule E - Arden",
    subcategories: categories.scheduleE.subcategories,
    qualifiers: [1]
  },
  {
    name: "Schedule E - Azalea",
    subcategories: categories.scheduleE.subcategories,
    qualifiers: [2]
  },
  {
    name: "Schedule E - Rosemont",
    subcategories: categories.scheduleE.subcategories,
    qualifiers: [4]
  }
];

export const getReport = () => reportConfig.map(reportItem => {
  const { subcategories } = reportItem;
  if (reportItem.qualifiers?.length) {
    const _subcategories = subcategories.map(subcategory => {
      const _ids = [...subcategory.ids, ...reportItem.qualifiers];
      return {...subcategory, ids: _ids}
    });
    return {...reportItem, subcategories: _subcategories}
  }
  return reportItem;
});
