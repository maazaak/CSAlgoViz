module.exports = questions = [
  {
    "id": 1,
    "title": "Add Two Numbers",
    "description": "Write a function to add two numbers and return the result.",
    "difficulty": "Easy",
    "testCases": [
      {
        "input": [
          1,
          2
        ],
        "expectedOutput": 3
      },
      {
        "input": [
          5,
          7
        ],
        "expectedOutput": 12
      },
      {
        "input": [
          -1,
          1
        ],
        "expectedOutput": 0
      }
    ],
    "edgeCases": [
      {
        "input": [
          9007199254740991,
          1
        ],
        "expectedOutput": 9007199254740992
      },
      {
        "input": [
          -9007199254740991,
          -1
        ],
        "expectedOutput": -9007199254740992
      },
      {
        "input": [
          0,
          0
        ],
        "expectedOutput": 0
      }
    ]
  },
  {
    "id": 2,
    "title": "Reverse a String",
    "description": "Write a function to reverse a string.",
    "difficulty": "Easy",
    "testCases": [
      {
        "input": [
          "hello"
        ],
        "expectedOutput": "olleh"
      },
      {
        "input": [
          "world"
        ],
        "expectedOutput": "dlrow"
      },
      {
        "input": [
          "abc"
        ],
        "expectedOutput": "cba"
      }
    ],
    "edgeCases": [
      {
        "input": [
          ""
        ],
        "expectedOutput": ""
      },
      {
        "input": [
          "a"
        ],
        "expectedOutput": "a"
      },
      {
        "input": [
          "racecar"
        ],
        "expectedOutput": "racecar"
      }
    ]
  },
  {
    "id": 3,
    "title": "Maximum of Two Numbers",
    "description": "Write a function to find the maximum of two numbers.",
    "difficulty": "Easy",
    "testCases": [
      {
        "input": [
          3,
          5
        ],
        "expectedOutput": 5
      },
      {
        "input": [
          100,
          50
        ],
        "expectedOutput": 100
      },
      {
        "input": [
          -1,
          1
        ],
        "expectedOutput": 1
      }
    ],
    "edgeCases": [
      {
        "input": [
          0,
          0
        ],
        "expectedOutput": 0
      },
      {
        "input": [
          -10,
          -20
        ],
        "expectedOutput": -10
      },
      {
        "input": [
          1,
          1
        ],
        "expectedOutput": 1
      }
    ]
  },
  {
    "id": 4,
    "title": "Count Primes",
    "description": "Given an integer n, return the number of prime numbers less than n.",
    "difficulty": "Easy",
    "testCases": [
      {
        "input": [
          10
        ],
        "expectedOutput": 4
      },
      {
        "input": [
          20
        ],
        "expectedOutput": 8
      },
      {
        "input": [
          5
        ],
        "expectedOutput": 2
      }
    ],
    "edgeCases": [
      {
        "input": [
          1
        ],
        "expectedOutput": 0
      },
      {
        "input": [
          0
        ],
        "expectedOutput": 0
      },
      {
        "input": [
          2
        ],
        "expectedOutput": 0
      }
    ]
  },
  {
    "id": 5,
    "title": "Merge Two Sorted Arrays",
    "description": "Given two sorted arrays nums1 and nums2, merge them into one sorted array.",
    "difficulty": "Easy",
    "testCases": [
      {
        "input": [
          [
            1,
            3,
            5
          ],
          [
            2,
            4,
            6
          ]
        ],
        "expectedOutput": [
          1,
          2,
          3,
          4,
          5,
          6
        ]
      },
      {
        "input": [
          [
            1
          ],
          [
            2,
            3
          ]
        ],
        "expectedOutput": [
          1,
          2,
          3
        ]
      },
      {
        "input": [
          [
            1,
            5
          ],
          [
            2,
            6
          ]
        ],
        "expectedOutput": [
          1,
          2,
          5,
          6
        ]
      }
    ],
    "edgeCases": [
      {
        "input": [
          [],
          []
        ],
        "expectedOutput": []
      },
      {
        "input": [
          [
            1,
            2,
            3
          ],
          []
        ],
        "expectedOutput": [
          1,
          2,
          3
        ]
      },
      {
        "input": [
          [
            100
          ],
          [
            50
          ]
        ],
        "expectedOutput": [
          50,
          100
        ]
      }
    ]
  },
  {
    "id": 6,
    "title": "Longest Substring Without Repeating Characters",
    "description": "Given a string s, find the length of the longest substring without repeating characters.",
    "difficulty": "Medium",
    "testCases": [
      {
        "input": [
          "abcabcbb"
        ],
        "expectedOutput": 3
      },
      {
        "input": [
          "bbbbb"
        ],
        "expectedOutput": 1
      },
      {
        "input": [
          "pwwkew"
        ],
        "expectedOutput": 3
      }
    ],
    "edgeCases": [
      {
        "input": [
          ""
        ],
        "expectedOutput": 0
      },
      {
        "input": [
          "a"
        ],
        "expectedOutput": 1
      },
      {
        "input": [
          "dvdf"
        ],
        "expectedOutput": 3
      }
    ]
  },
  {
    "id": 7,
    "title": "Find the Longest Palindrome",
    "description": "Given a string s, return the longest palindromic substring in s.",
    "difficulty": "Medium",
    "testCases": [
      {
        "input": [
          "babad"
        ],
        "expectedOutput": "bab"
      },
      {
        "input": [
          "cbbd"
        ],
        "expectedOutput": "bb"
      },
      {
        "input": [
          "racecar"
        ],
        "expectedOutput": "racecar"
      }
    ],
    "edgeCases": [
      {
        "input": [
          "a"
        ],
        "expectedOutput": "a"
      },
      {
        "input": [
          "ab"
        ],
        "expectedOutput": "a"
      },
      {
        "input": [
          ""
        ],
        "expectedOutput": ""
      }
    ]
  },
  {
    "id": 8,
    "title": "Rotate Array",
    "description": "Given an array, rotate the array to the right by k steps, where k is non-negative.",
    "difficulty": "Medium",
    "testCases": [
      {
        "input": [
          [
            1,
            2,
            3,
            4,
            5,
            6,
            7
          ],
          3
        ],
        "expectedOutput": [
          5,
          6,
          7,
          1,
          2,
          3,
          4
        ]
      },
      {
        "input": [
          [
            -1,
            -100,
            3,
            99
          ],
          2
        ],
        "expectedOutput": [
          3,
          99,
          -1,
          -100
        ]
      },
      {
        "input": [
          [
            1,
            2
          ],
          1
        ],
        "expectedOutput": [
          2,
          1
        ]
      }
    ],
    "edgeCases": [
      {
        "input": [
          [
            1,
            2
          ],
          0
        ],
        "expectedOutput": [
          1,
          2
        ]
      },
      {
        "input": [
          [
            1
          ],
          1
        ],
        "expectedOutput": [
          1
        ]
      },
      {
        "input": [
          [
            1,
            2
          ],
          3
        ],
        "expectedOutput": [
          2,
          1
        ]
      }
    ]
  },
  {
    "id": 9,
    "title": "Find Peak Element",
    "description": "A peak element is an element that is strictly greater than its neighbors. Given an array of integers, find a peak element.",
    "difficulty": "Medium",
    "testCases": [
      {
        "input": [
          [
            1,
            2,
            3,
            1
          ]
        ],
        "expectedOutput": 3
      },
      {
        "input": [
          [
            1,
            2,
            1,
            3,
            5,
            6,
            4
          ]
        ],
        "expectedOutput": 6
      },
      {
        "input": [
          [
            1,
            2
          ]
        ],
        "expectedOutput": 2
      }
    ],
    "edgeCases": [
      {
        "input": [
          [
            1
          ]
        ],
        "expectedOutput": 1
      },
      {
        "input": [
          [
            1,
            2,
            3,
            4,
            5
          ]
        ],
        "expectedOutput": 5
      },
      {
        "input": [
          [
            5,
            4,
            3,
            2,
            1
          ]
        ],
        "expectedOutput": 5
      }
    ]
  },
  {
    "id": 10,
    "title": "Find Majority Element",
    "description": "Given an array of size n, find the majority element. The majority element is the element that appears more than ⌊n/2⌋ times.",
    "difficulty": "Medium",
    "testCases": [
      {
        "input": [
          [
            3,
            2,
            3
          ]
        ],
        "expectedOutput": 3
      },
      {
        "input": [
          [
            2,
            2,
            1,
            1,
            1,
            2,
            2
          ]
        ],
        "expectedOutput": 2
      },
      {
        "input": [
          [
            1,
            1,
            1,
            1
          ]
        ],
        "expectedOutput": 1
      }
    ],
    "edgeCases": [
      {
        "input": [
          [
            1
          ]
        ],
        "expectedOutput": 1
      },
      {
        "input": [
          [
            2,
            2
          ]
        ],
        "expectedOutput": 2
      },
      {
        "input": [
          [
            3,
            3,
            3,
            3,
            1,
            2
          ]
        ],
        "expectedOutput": 3
      }
    ]
  },
  {
    "id": 11,
    "title": "Maximum Rectangle in Histogram",
    "description": "Given an array representing the heights of bars in a histogram, find the area of the largest rectangle that can be formed.",
    "difficulty": "Hard",
    "testCases": [
      {
        "input": [
          [
            2,
            1,
            5,
            6,
            2,
            3
          ]
        ],
        "expectedOutput": 10
      },
      {
        "input": [
          [
            4,
            2,
            0,
            3,
            2,
            5
          ]
        ],
        "expectedOutput": 6
      },
      {
        "input": [
          [
            6,
            7,
            5,
            2,
            4,
            5,
            9,
            3
          ]
        ],
        "expectedOutput": 16
      }
    ],
    "edgeCases": [
      {
        "input": [
          [
            2
          ]
        ],
        "expectedOutput": 2
      },
      {
        "input": [
          []
        ],
        "expectedOutput": 0
      },
      {
        "input": [
          [
            0,
            0,
            0,
            0
          ]
        ],
        "expectedOutput": 0
      }
    ]
  },
  {
    "id": 12,
    "title": "Trapping Rain Water",
    "description": "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    "difficulty": "Hard",
    "testCases": [
      {
        "input": [
          [
            0,
            1,
            0,
            2,
            1,
            0,
            1,
            3,
            2,
            1,
            2,
            1
          ]
        ],
        "expectedOutput": 6
      },
      {
        "input": [
          [
            4,
            2,
            0,
            3,
            2,
            5
          ]
        ],
        "expectedOutput": 9
      },
      {
        "input": [
          [
            2,
            0,
            2
          ]
        ],
        "expectedOutput": 2
      }
    ],
    "edgeCases": [
      {
        "input": [
          [
            1
          ]
        ],
        "expectedOutput": 0
      },
      {
        "input": [
          [
            3,
            2,
            1
          ]
        ],
        "expectedOutput": 0
      },
      {
        "input": [
          []
        ],
        "expectedOutput": 0
      }
    ]
  },
  {
    "id": 13,
    "title": "N-Queens Problem",
    "description": "Given an integer n, return all distinct solutions to the n-queens puzzle. Each solution contains a distinct board configuration of the n-queens' placement.",
    "difficulty": "Hard",
    "testCases": [
      {
        "input": 4,
        "expectedOutput": [
          [
            ".Q..",
            "...Q",
            "Q...",
            "..Q."
          ],
          [
            "..Q.",
            "Q...",
            "...Q",
            ".Q.."
          ]
        ]
      },
      {
        "input": 1,
        "expectedOutput": [
          [
            "Q"
          ]
        ]
      },
      {
        "input": 5,
        "expectedOutput": [
          [
            "Q....",
            "..Q..",
            "....Q",
            ".Q...",
            "...Q."
          ],
          [
            "Q....",
            "...Q.",
            ".Q...",
            "....Q",
            "..Q.."
          ]
        ]
      }
    ],
    "edgeCases": [
      {
        "input": 2,
        "expectedOutput": []
      },
      {
        "input": 3,
        "expectedOutput": []
      },
      {
        "input": 6,
        "expectedOutput": []
      }
    ]
  },
  {
    "id": 14,
    "title": "Word Search II",
    "description": "Given a 2D board and a list of words, find all words in the board. Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring.",
    "difficulty": "Hard",
    "testCases": [
      {
        "input": [
          [
            "o",
            "a",
            "a",
            "n"
          ],
          [
            "e",
            "t",
            "a",
            "e"
          ],
          [
            "i",
            "h",
            "k",
            "r"
          ],
          [
            "i",
            "f",
            "l",
            "v"
          ]
        ],
        "expectedOutput": [
          "eat",
          "oath"
        ]
      },
      {
        "input": [
          [
            "a",
            "b"
          ],
          [
            "c",
            "d"
          ]
        ],
        "expectedOutput": []
      },
      {
        "input": [
          [
            "o",
            "a",
            "b"
          ],
          [
            "b",
            "t",
            "a"
          ],
          [
            "a",
            "a",
            "t"
          ]
        ],
        "expectedOutput": [
          "bat",
          "tab"
        ]
      }
    ],
    "edgeCases": [
      {
        "input": [
          [
            "a"
          ]
        ],
        "expectedOutput": []
      },
      {
        "input": [
          [
            "x",
            "y",
            "z"
          ],
          [
            "a",
            "b",
            "c"
          ]
        ],
        "expectedOutput": []
      },
      {
        "input": [
          [
            "a",
            "b",
            "c",
            "d"
          ],
          [
            "e",
            "f",
            "g",
            "h"
          ],
          [
            "i",
            "j",
            "k",
            "l"
          ]
        ],
        "expectedOutput": [
          "abc",
          "ijkl"
        ]
      }
    ]
  },
  {
    "id": 15,
    "title": "Longest Valid Parentheses",
    "description": "Given a string containing just the characters '(' and ')', find the length of the longest valid (well-formed) parentheses substring.",
    "difficulty": "Hard",
    "testCases": [
      {
        "input": "(()",
        "expectedOutput": 2
      },
      {
        "input": ")()())",
        "expectedOutput": 4
      },
      {
        "input": "",
        "expectedOutput": 0
      }
    ],
    "edgeCases": [
      {
        "input": "(((((",
        "expectedOutput": 0
      },
      {
        "input": "))))",
        "expectedOutput": 0
      },
      {
        "input": "()()",
        "expectedOutput": 4
      }
    ]
  },
  {
    "id": 1729615855763,
    "title": "Generated Question (Medium)",
    "description": "Question: Given an array of integers, return the maximum product of three numbers.\n\nExample:\nInput: [1, 2, 3, 4]\nOutput: 24\n\nTest Cases:\n1. Input: [1, 2, 3, 4]\n   Output: 24\n2. Input: [-1, -2, -3, -4]\n   Output: -6\n3. Input: [-2, 0, 3, 4]\n   Output: 24\n\nEdge Cases:\n1. Input: [1, 2, 3]\n   Output: 6\n2. Input: [-1, -2, -3]\n   Output: -6\n3. Input: [0, 0, 0]\n   Output: 0",
    "difficulty": "Medium",
    "testCases": [
      {
        "input": [
          [
            1,
            2,
            3,
            4
          ]
        ],
        "expectedOutput": 24
      },
      {
        "input": [
          [
            -1,
            -2,
            -3,
            -4
          ]
        ],
        "expectedOutput": -6
      },
      {
        "input": [
          [
            -2,
            2,
            3,
            4
          ]
        ],
        "expectedOutput": 24
      }
    ],
    "edgeCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expectedOutput": 6
      },
      {
        "input": [
          [
            -1,
            -2,
            -3
          ]
        ],
        "expectedOutput": -6
      },
      {
        "input": [
          [
            0,
            0,
            0
          ]
        ],
        "expectedOutput": 0
      }
    ]
  },
  {
    "id": 1729629032715,
    "title": "Generated Question (Medium)",
    "description": "**Problem**: Write a function 'findMaxProduct' that takes an array of integers and returns the maximum product you can get by multiplying any three numbers from the array. The function should return null if the array length is less than 3.\n\n**Function Signature**: function findMaxProduct(arr):",
    "difficulty": "Medium",
    "testCases": [
      {
        "input": [
          [
            1,
            2,
            3,
            4
          ]
        ],
        "expectedOutput": 24
      },
      {
        "input": [
          [
            -10,
            -10,
            1,
            3,
            2
          ]
        ],
        "expectedOutput": 300
      },
      {
        "input": [
          [
            10,
            3,
            5,
            6,
            20
          ]
        ],
        "expectedOutput": 1200
      }
    ],
    "edgeCases": [
      {
        "input": [
          [
            9007199254740991,
            1,
            2
          ]
        ],
        "expectedOutput": 18014398509481982
      },
      {
        "input": [
          [
            0,
            0,
            0
          ]
        ],
        "expectedOutput": 0
      },
      {
        "input": [
          [
            1
          ]
        ],
        "expectedOutput": null
      }
    ]
  },
  {
    "id": 1729629392971,
    "title": "Generated Question (Medium)",
    "description": "**Problem**: Given an array of integers, write a function that finds the maximum difference between any pair of elements such that the smaller element appears before the larger element in the array. If no such pair exists, return -1.\n\n**Function Signature**: function maxDifference(arr)",
    "difficulty": "Medium",
    "testCases": [
      {
        "input": [
          [
            7,
            9,
            5,
            6,
            3,
            2
          ]
        ],
        "expectedOutput": 2
      },
      {
        "input": [
          [
            2,
            3,
            10,
            6,
            4,
            8,
            1
          ]
        ],
        "expectedOutput": 8
      },
      {
        "input": [
          [
            7,
            9,
            5,
            1,
            3,
            2
          ]
        ],
        "expectedOutput": 2
      }
    ],
    "edgeCases": [
      {
        "input": [
          [
            1,
            1,
            1,
            1,
            1
          ]
        ],
        "expectedOutput": 0
      },
      {
        "input": [
          [
            5,
            4,
            3,
            2,
            1
          ]
        ],
        "expectedOutput": -1
      },
      {
        "input": [
          [
            1
          ]
        ],
        "expectedOutput": -1
      }
    ]
  },
  {
    "id": 1729631180977,
    "title": "Generated Question (Medium)",
    "description": "**Problem**: Given a string of characters, write a function to determine if it is a palindrome. A palindrome is a word, phrase, number, or other sequence of characters that reads the same forward and backward, ignoring spaces, punctuation, and capitalization.\n\n**Function Signature**: function isPalindrome(inputString)",
    "difficulty": "Medium",
    "testCases": [
      {
        "input": "racecar",
        "expectedOutput": true
      },
      {
        "input": "javascript",
        "expectedOutput": false
      },
      {
        "input": "Able was I ere I saw Elba",
        "expectedOutput": true
      }
    ],
    "edgeCases": [
      {
        "input": "",
        "expectedOutput": true
      },
      {
        "input": " ",
        "expectedOutput": true
      },
      {
        "input": "A man, a plan, a canal, Panama",
        "expectedOutput": true
      }
    ]
  },
  {
    "id": 1729632428980,
    "title": "Generated Question (Medium)",
    "description": "**Problem**: Given a string, write a function to check if it is a permutation of a palindrome. A palindrome is a word or phrase that is the same forwards and backwards. A permutation is a rearrangement of letters. The palindrome does not need to be limited to just dictionary words. Ignore casing and non-letter characters.\n\n**Function Signature**: function isPermutationOfPalindrome(input)",
    "difficulty": "Medium",
    "testCases": [
      {
        "input": "Tact Coa",
        "expectedOutput": true
      },
      {
        "input": "race car",
        "expectedOutput": true
      },
      {
        "input": "hello",
        "expectedOutput": false
      }
    ],
    "edgeCases": [
      {
        "input": "Able was I ere I saw Elba",
        "expectedOutput": true
      },
      {
        "input": "",
        "expectedOutput": true
      },
      {
        "input": "1a1",
        "expectedOutput": true
      }
    ]
  },
  {
    "id": 1729659289907,
    "title": "Generated Question (Medium)",
    "description": "**Problem**: You have an array of integers where each integer represents a jump of its value in the array. For instance, the integer 3 represents a jump of three indexes forward in the array; the integer -3 represents a jump of three indexes backwards in the array. If a jump spills past the array's bounds, it wraps over to the other side. Write a function 'hasSingleCycle' that returns a boolean representing whether the jumps in the array form a single cycle. A single cycle occurs if, starting at any index in the array and following the jumps, every element in the array is visited exactly once before landing back on the starting index.\n\n**Function Signature**: function hasSingleCycle(array):",
    "difficulty": "Medium",
    "testCases": [
      {
        "input": [
          2,
          3,
          1,
          -4,
          -4,
          2
        ],
        "expectedOutput": true
      },
      {
        "input": [
          2,
          2,
          -1
        ],
        "expectedOutput": true
      },
      {
        "input": [
          1,
          1,
          1,
          1,
          2
        ],
        "expectedOutput": false
      }
    ],
    "edgeCases": [
      {
        "input": [
          0
        ],
        "expectedOutput": true
      },
      {
        "input": [
          1,
          -1
        ],
        "expectedOutput": true
      },
      {
        "input": [
          -1,
          2,
          2
        ],
        "expectedOutput": false
      }
    ]
  },
  {
    "title": "Generated Question (Hard)",
    "description": "**Problem**: Given a string s that consists of alphanumeric characters only, you need to perform the following operation on it any number of times until you get a sorted string: Pick one character from the string and move it to the end of the string. Determine the minimum number of operations to get a sorted string. If it is impossible to sort the string, return -1.\n\n**Function Signature**: function minMovesToSort(s)",
    "difficulty": "Hard",
    "testCases": [
      {
        "input": [
          "azbz"
        ],
        "expectedOutput": 1,
        "_id": "674ddece67ae6611c9372e7c"
      },
      {
        "input": [
          "abdce"
        ],
        "expectedOutput": 0,
        "_id": "674ddece67ae6611c9372e7d"
      },
      {
        "input": [
          "abcdeabcde"
        ],
        "expectedOutput": 10,
        "_id": "674ddece67ae6611c9372e7e"
      }
    ],
    "edgeCases": [
      {
        "input": [
          "z"
        ],
        "expectedOutput": 0,
        "_id": "674ddece67ae6611c9372e7f"
      },
      {
        "input": [
          "abcdefg"
        ],
        "expectedOutput": 0,
        "_id": "674ddece67ae6611c9372e80"
      },
      {
        "input": [
          "dcba"
        ],
        "expectedOutput": -1,
        "_id": "674ddece67ae6611c9372e81"
      }
    ],
    "_id": "674ddece67ae6611c9372e7b",
    "id": 1733156558106,
    "__v": 0
  },
  {
    "title": "Generated Question (Hard)",
    "description": "**Problem**: Given an array of integers and a target integer, write a function in JavaScript that returns an array containing all unique quadruplets [nums[a], nums[b], nums[c], nums[d]] in the array that add up to the target. The quadruplets must be ordered such that a <= b <= c <= d. The answer array should not contain duplicate quadruplets.\n\n**Function Signature**: function fourSum(nums, target):",
    "difficulty": "Hard",
    "testCases": [
      {
        "input": [
          [
            1,
            0,
            -1,
            0,
            -2,
            2
          ],
          0
        ],
        "expectedOutput": [
          [
            -2,
            -1,
            1,
            2
          ],
          [
            -2,
            0,
            0,
            2
          ],
          [
            -1,
            0,
            0,
            1
          ]
        ],
        "_id": "674de078ec9bc0f67181318a"
      },
      {
        "input": [
          [
            2,
            2,
            2,
            2,
            2
          ],
          8
        ],
        "expectedOutput": [
          [
            2,
            2,
            2,
            2
          ]
        ],
        "_id": "674de078ec9bc0f67181318b"
      },
      {
        "input": [
          [
            -3,
            -2,
            -1,
            0,
            0,
            1,
            2,
            3
          ],
          0
        ],
        "expectedOutput": [
          [
            -3,
            -2,
            2,
            3
          ],
          [
            -3,
            -1,
            1,
            3
          ],
          [
            -3,
            0,
            0,
            3
          ],
          [
            -3,
            0,
            1,
            2
          ],
          [
            -2,
            -1,
            0,
            3
          ],
          [
            -2,
            -1,
            1,
            2
          ],
          [
            -2,
            0,
            0,
            2
          ],
          [
            -1,
            0,
            0,
            1
          ]
        ],
        "_id": "674de078ec9bc0f67181318c"
      }
    ],
    "edgeCases": [
      {
        "input": [
          [],
          0
        ],
        "expectedOutput": [],
        "_id": "674de078ec9bc0f67181318d"
      },
      {
        "input": [
          [
            1,
            0,
            -1,
            0,
            -2,
            2
          ],
          100
        ],
        "expectedOutput": [],
        "_id": "674de078ec9bc0f67181318e"
      },
      {
        "input": [
          [
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1
          ],
          4
        ],
        "expectedOutput": [
          [
            1,
            1,
            1,
            1
          ]
        ],
        "_id": "674de078ec9bc0f67181318f"
      }
    ],
    "_id": "674de078ec9bc0f671813189",
    "id": 1733156984212,
    "__v": 0
  },
  {
    "title": "Generated Question (Hard)",
    "description": "**Problem**: You are given an array of integers where each integer represents a jump of its value in the array. For instance, the integer 2 represents a jump of 2 indices forward in the array. Conversely, the integer -3 represents a jump of three indices backward in the array. If a jump spills past the array's bounds, it wraps over to the other side. Write a function that returns a boolean representing whether the jumps in the array form a single cycle. A single cycle occurs if, starting at any index in the array and following the jumps, every element in the array is visited exactly once before landing back on the starting index.\n\n**Function Signature**: function hasSingleCycle(arr)",
    "difficulty": "Hard",
    "testCases": [
      {
        "input": [
          [
            2,
            3,
            1,
            -4,
            -4,
            2
          ]
        ],
        "expectedOutput": true,
        "_id": "674de19dec9bc0f671813192"
      },
      {
        "input": [
          [
            1,
            1,
            1,
            1,
            2
          ]
        ],
        "expectedOutput": false,
        "_id": "674de19dec9bc0f671813193"
      },
      {
        "input": [
          [
            1,
            2,
            3,
            4,
            -2,
            3,
            7,
            8,
            -26
          ]
        ],
        "expectedOutput": true,
        "_id": "674de19dec9bc0f671813194"
      }
    ],
    "edgeCases": [
      {
        "input": [
          [
            -1,
            2,
            3,
            5,
            3,
            2,
            1,
            -2
          ]
        ],
        "expectedOutput": true,
        "_id": "674de19dec9bc0f671813195"
      },
      {
        "input": [
          [
            2
          ]
        ],
        "expectedOutput": true,
        "_id": "674de19dec9bc0f671813196"
      },
      {
        "input": [
          [
            1,
            -1
          ]
        ],
        "expectedOutput": true,
        "_id": "674de19dec9bc0f671813197"
      }
    ],
    "_id": "674de19dec9bc0f671813191",
    "id": 1733157277386,
    "__v": 0
  },
  {
    "title": "Generated Question (Hard)",
    "description": "**Problem**: Given an array of non-negative integers nums, you are initially positioned at the first index of the array. Each element in the array represents your maximum jump length at that position. Write a function to determine if you are able to reach the last index in minimum number of jumps. Your function should return the minimum number of jumps required to reach the last index. If the last index is unreachable, return -1.\n\n**Function Signature**: function minJumps(nums: number[]): number",
    "difficulty": "Hard",
    "testCases": [
      {
        "input": [
          [
            2,
            3,
            1,
            1,
            4
          ]
        ],
        "expectedOutput": 2,
        "_id": "674de1ecec9bc0f67181319a"
      },
      {
        "input": [
          [
            1,
            1,
            1,
            1,
            1
          ]
        ],
        "expectedOutput": 4,
        "_id": "674de1ecec9bc0f67181319b"
      },
      {
        "input": [
          [
            3,
            2,
            1,
            0,
            4
          ]
        ],
        "expectedOutput": -1,
        "_id": "674de1ecec9bc0f67181319c"
      }
    ],
    "edgeCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expectedOutput": 0,
        "_id": "674de1ecec9bc0f67181319d"
      },
      {
        "input": [
          [
            2,
            0,
            0,
            0,
            4
          ]
        ],
        "expectedOutput": 2,
        "_id": "674de1ecec9bc0f67181319e"
      },
      {
        "input": [
          [
            100,
            50,
            0,
            0,
            100
          ]
        ],
        "expectedOutput": 2,
        "_id": "674de1ecec9bc0f67181319f"
      }
    ],
    "_id": "674de1ecec9bc0f671813199",
    "id": 1733157356705,
    "__v": 0
  },
  {
    "title": "Generated Question (Hard)",
    "description": "**Problem**: Given a 2D matrix of 0's and 1's, find the number of unique paths from top-left to bottom-right, you can only move either right or down at any point, but you cannot move on cells having 1's. Write a function 'uniquePaths' that returns the number of such unique paths. If there is no valid path, return 0.\n\n**Function Signature**: function uniquePaths(matrix: number[][]): number",
    "difficulty": "Hard",
    "testCases": [
      {
        "input": [
          [
            [
              0,
              0,
              0
            ],
            [
              0,
              1,
              0
            ],
            [
              0,
              0,
              0
            ]
          ]
        ],
        "expectedOutput": 2,
        "_id": "674de22e8a91b7ba321c8350"
      },
      {
        "input": [
          [
            [
              0,
              0,
              0,
              0
            ],
            [
              0,
              1,
              0,
              0
            ],
            [
              0,
              0,
              0,
              1
            ],
            [
              0,
              0,
              0,
              0
            ]
          ]
        ],
        "expectedOutput": 3,
        "_id": "674de22e8a91b7ba321c8351"
      },
      {
        "input": [
          [
            [
              0,
              0,
              1
            ],
            [
              0,
              0,
              0
            ],
            [
              1,
              0,
              0
            ]
          ]
        ],
        "expectedOutput": 1,
        "_id": "674de22e8a91b7ba321c8352"
      }
    ],
    "edgeCases": [
      {
        "input": [
          [
            [
              1
            ]
          ]
        ],
        "expectedOutput": 0,
        "_id": "674de22e8a91b7ba321c8353"
      },
      {
        "input": [
          [
            [
              1,
              0
            ],
            [
              0,
              0
            ]
          ]
        ],
        "expectedOutput": 0,
        "_id": "674de22e8a91b7ba321c8354"
      },
      {
        "input": [
          [
            [
              0,
              0,
              1
            ],
            [
              0,
              1,
              0
            ],
            [
              1,
              0,
              0
            ]
          ]
        ],
        "expectedOutput": 0,
        "_id": "674de22e8a91b7ba321c8355"
      }
    ],
    "_id": "674de22e8a91b7ba321c834f",
    "id": 1733157422793,
    "__v": 0
  }
];