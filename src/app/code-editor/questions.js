const questions = [
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
    "description": "**Problem**: Given a string array words, find the maximum value of length(word[i]) * length(word[j]) where the two words do not share common characters. You may assume that each word will contain only lower case letters. If no such two words exist, return 0.\n\n**Function Signature**: function maxProduct(words: string[]): number",
    "difficulty": "Hard",
    "testCases": [
      {
        "input": [
          [
            "abcw",
            "baz",
            "foo",
            "bar",
            "xtfn",
            "abcdef"
          ]
        ],
        "expectedOutput": 16,
        "_id": "674de3ced138f6c33123f000"
      },
      {
        "input": [
          [
            "a",
            "ab",
            "abc",
            "d",
            "cd",
            "bcd",
            "abcd"
          ]
        ],
        "expectedOutput": 4,
        "_id": "674de3ced138f6c33123f001"
      },
      {
        "input": [
          [
            "a",
            "aa",
            "aaa",
            "aaaa"
          ]
        ],
        "expectedOutput": 0,
        "_id": "674de3ced138f6c33123f002"
      }
    ],
    "edgeCases": [
      {
        "input": [
          []
        ],
        "expectedOutput": 0,
        "_id": "674de3ced138f6c33123f003"
      },
      {
        "input": [
          [
            "a"
          ]
        ],
        "expectedOutput": 0,
        "_id": "674de3ced138f6c33123f004"
      },
      {
        "input": [
          [
            "a",
            "b"
          ]
        ],
        "expectedOutput": 1,
        "_id": "674de3ced138f6c33123f005"
      }
    ],
    "_id": "674de3ced138f6c33123efff",
    "id": 1733157838608,
    "__v": 0
  },
  {
    "title": "Generated Question (Hard)",
    "description": "**Problem**: Given an array of integers, find the length of the longest consecutive elements sequence. Your algorithm should have a time complexity of O(n).\n\n**Function Signature**: function longestConsecutiveSequence(nums: number[]): number",
    "difficulty": "Hard",
    "testCases": [
      {
        "input": [
          [
            100,
            4,
            200,
            1,
            3,
            2
          ]
        ],
        "expectedOutput": 4,
        "_id": "674de57ee721ca5a70a18a42"
      },
      {
        "input": [
          [
            1,
            2,
            2,
            3,
            4
          ]
        ],
        "expectedOutput": 4
      },
      {
        "input": [
          [
            0,
            3,
            7,
            2,
            5,
            8,
            4,
            6,
            0,
            1
          ]
        ],
        "expectedOutput": 9,
        "_id": "674de57ee721ca5a70a18a43"
      },
      {
        "input": [
          [
            9,
            1,
            4,
            7,
            3,
            -1,
            0,
            5,
            8,
            -1,
            6
          ]
        ],
        "expectedOutput": 7,
        "_id": "674de57ee721ca5a70a18a44"
      }
    ],
    "edgeCases": [
      {
        "input": [
          [
            9007199254740991
          ]
        ],
        "expectedOutput": 1,
        "_id": "674de57ee721ca5a70a18a45"
      },
      {
        "input": [
          [
            0,
            0,
            0,
            0,
            0,
            0,
            0
          ]
        ],
        "expectedOutput": 1,
        "_id": "674de57ee721ca5a70a18a46"
      },
      {
        "input": [
          [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20
          ]
        ],
        "expectedOutput": 20,
        "_id": "674de57ee721ca5a70a18a47"
      }
    ],
    "_id": "674de57ee721ca5a70a18a41",
    "id": 1733158270985,
    "__v": 0
  },
  {
    "title": "Generated Question (Medium)",
    "description": "**Problem**: Write a function that takes in a string and returns the most frequent character in the string. If there are multiple characters that appear the most frequent number of times, return them in the order they appear in the string.\n\n**Function Signature**: function mostFrequentChar(str):",
    "difficulty": "Medium",
    "testCases": [
      {
        "input": [
          "javascript"
        ],
        "expectedOutput": "a",
        "_id": "67545e02acf29e9ad3591d0f"
      },
      {
        "input": [
          "hello world"
        ],
        "expectedOutput": "l",
        "_id": "67545e02acf29e9ad3591d10"
      },
      {
        "input": [
          "test cases"
        ],
        "expectedOutput": "t",
        "_id": "67545e02acf29e9ad3591d11"
      }
    ],
    "edgeCases": [
      {
        "input": [
          "aaaaaaaab"
        ],
        "expectedOutput": "a",
        "_id": "67545e02acf29e9ad3591d12"
      },
      {
        "input": [
          ""
        ],
        "expectedOutput": null,
        "_id": "67545e02acf29e9ad3591d13"
      },
      {
        "input": [
          "equal frequencies"
        ],
        "expectedOutput": "e",
        "_id": "67545e02acf29e9ad3591d14"
      }
    ],
    "_id": "67545e02acf29e9ad3591d0e",
    "id": 1733582338317,
    "__v": 0
  },
  {
    "title": "Generated Question (Easy)",
    "description": "**Problem**: Write a function that takes two numbers as arguments and returns their sum.\n\n**Function Signature**: function addTwoNumbers(num1, num2)",
    "difficulty": "Easy",
    "testCases": [
      {
        "input": [
          1,
          2
        ],
        "expectedOutput": 3,
        "_id": "67546405d3a41b432b3f0efa"
      },
      {
        "input": [
          3,
          5
        ],
        "expectedOutput": 8,
        "_id": "67546405d3a41b432b3f0efb"
      },
      {
        "input": [
          6,
          9
        ],
        "expectedOutput": 15,
        "_id": "67546405d3a41b432b3f0efc"
      }
    ],
    "edgeCases": [
      {
        "input": [
          9007199254740991,
          1
        ],
        "expectedOutput": 9007199254740992,
        "_id": "67546405d3a41b432b3f0efd"
      },
      {
        "input": [
          0,
          0
        ],
        "expectedOutput": 0,
        "_id": "67546405d3a41b432b3f0efe"
      },
      {
        "input": [
          1,
          -1
        ],
        "expectedOutput": 0,
        "_id": "67546405d3a41b432b3f0eff"
      }
    ],
    "_id": "67546405d3a41b432b3f0ef9",
    "id": 1733583877203,
    "__v": 0
  },
  {
    "title": "Generated Question (Medium)",
    "description": "**Problem**: You are given a string containing only parentheses and brackets (i.e., '(', ')', '[', and ']'). Write a function 'validateBrackets' that takes a string as input and returns true if the parentheses and brackets in the string are perfectly balanced and false otherwise. A string is balanced if all open brackets have corresponding closing brackets in the correct order.\n\n**Function Signature**: function validateBrackets(str)",
    "difficulty": "Medium",
    "testCases": [
      {
        "input": [
          "(())"
        ],
        "expectedOutput": true,
        "_id": "675709e230943309aa6ce826"
      },
      {
        "input": [
          "([])"
        ],
        "expectedOutput": true,
        "_id": "675709e230943309aa6ce827"
      },
      {
        "input": [
          "([)]"
        ],
        "expectedOutput": false,
        "_id": "675709e230943309aa6ce828"
      }
    ],
    "edgeCases": [
      {
        "input": [
          "("
        ],
        "expectedOutput": false,
        "_id": "675709e230943309aa6ce829"
      },
      {
        "input": [
          "(]"
        ],
        "expectedOutput": false,
        "_id": "675709e230943309aa6ce82a"
      },
      {
        "input": [
          ""
        ],
        "expectedOutput": true,
        "_id": "675709e230943309aa6ce82b"
      }
    ],
    "_id": "675709e230943309aa6ce825",
    "id": 1733757410652,
    "__v": 0
  },
  {
    "title": "Generated Question (Easy)",
    "description": "**Problem**: Write a function in JavaScript that takes two numbers as arguments and returns their sum.\n\n**Function Signature**: function sumTwoNumbers(num1, num2)",
    "difficulty": "Easy",
    "testCases": [
      {
        "input": [
          1,
          2
        ],
        "expectedOutput": 3,
        "_id": "67570cee5e6d0e498c8300d4"
      },
      {
        "input": [
          3,
          5
        ],
        "expectedOutput": 8,
        "_id": "67570cee5e6d0e498c8300d5"
      },
      {
        "input": [
          6,
          9
        ],
        "expectedOutput": 15,
        "_id": "67570cee5e6d0e498c8300d6"
      }
    ],
    "edgeCases": [
      {
        "input": [
          9007199254740991,
          1
        ],
        "expectedOutput": 9007199254740992,
        "_id": "67570cee5e6d0e498c8300d7"
      },
      {
        "input": [
          0,
          0
        ],
        "expectedOutput": 0,
        "_id": "67570cee5e6d0e498c8300d8"
      },
      {
        "input": [
          1,
          -1
        ],
        "expectedOutput": 0,
        "_id": "67570cee5e6d0e498c8300d9"
      }
    ],
    "_id": "67570cee5e6d0e498c8300d3",
    "id": 1733758190156,
    "__v": 0
  },
  {
    "id": 1733758641657,
    "title": "Generated Question (Easy)",
    "description": "**Problem**: Write a function that takes two numbers as arguments and returns their sum.\n\n**Function Signature**: function sum(a, b)",
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
          3,
          5
        ],
        "expectedOutput": 8
      },
      {
        "input": [
          6,
          9
        ],
        "expectedOutput": 15
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
          0,
          0
        ],
        "expectedOutput": 0
      },
      {
        "input": [
          1,
          -1
        ],
        "expectedOutput": 0
      }
    ]
  },
  {
    "id": 1733758661124,
    "title": "Generated Question (Medium)",
    "description": "**Problem**: Given an array of integers, return the sum of all even numbers in the array. If there are no even numbers, return 0.\n\n**Function Signature**: function sumEvenNumbers(arr)",
    "difficulty": "Medium",
    "testCases": [
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
        "expectedOutput": 6
      },
      {
        "input": [
          [
            6,
            7,
            8,
            9,
            10
          ]
        ],
        "expectedOutput": 24
      },
      {
        "input": [
          [
            11,
            12,
            13,
            14,
            15
          ]
        ],
        "expectedOutput": 26
      }
    ],
    "edgeCases": [
      {
        "input": [
          [
            9007199254740991,
            2
          ]
        ],
        "expectedOutput": 2
      },
      {
        "input": [
          [
            0,
            1,
            3,
            5,
            7
          ]
        ],
        "expectedOutput": 0
      },
      {
        "input": [
          [
            -2,
            -4,
            -6,
            -8
          ]
        ],
        "expectedOutput": -20
      }
    ]
  },
  {
    "id": 1733779937796,
    "title": "Generated Question (Medium)",
    "description": "**Problem**: Given an array of integers, your task is to write a function that finds the highest product you can get by multiplying any three numbers in the array. The function should return the highest possible product. You can assume that the array will always contain at least three integers.\n\n**Function Signature**: function highestProduct(array)",
    "difficulty": "Medium",
    "testCases": [
      {
        "input": [
          [
            1,
            3,
            5,
            7
          ]
        ],
        "expectedOutput": 105
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
            2,
            5,
            6,
            1,
            9
          ]
        ],
        "expectedOutput": 270
      }
    ],
    "edgeCases": [
      {
        "input": [
          [
            -4,
            -3,
            -2,
            -1
          ]
        ],
        "expectedOutput": -6
      },
      {
        "input": [
          [
            0,
            1,
            2
          ]
        ],
        "expectedOutput": 0
      },
      {
        "input": [
          [
            1,
            1,
            1
          ]
        ],
        "expectedOutput": 1
      }
    ]
  },
  {
    "id": 1733788470121,
    "title": "Generated Question (Medium)",
    "description": "**Problem**: Write a function that takes in a string and an integer n. The function should return a new string that contains each character of the input string repeated n times.\n\n**Function Signature**: function repeatChars(str, n)",
    "difficulty": "Medium",
    "testCases": [
      {
        "input": [
          "abc",
          3
        ],
        "expectedOutput": "aaabbbccc"
      },
      {
        "input": [
          "123",
          2
        ],
        "expectedOutput": "112233"
      },
      {
        "input": [
          "!",
          5
        ],
        "expectedOutput": "!!!!!"
      }
    ],
    "edgeCases": [
      {
        "input": [
          "",
          100
        ],
        "expectedOutput": ""
      },
      {
        "input": [
          "abc",
          0
        ],
        "expectedOutput": ""
      },
      {
        "input": [
          "1234567890",
          1
        ],
        "expectedOutput": "1234567890"
      }
    ]
  }
];
      
      module.exports = questions;