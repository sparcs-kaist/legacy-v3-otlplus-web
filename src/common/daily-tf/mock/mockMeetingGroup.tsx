import { MeetingGroup } from '../interface/Group';

const mockMeetingGroups: MeetingGroup[] = [
  {
    id: 1,
    year: 2025,
    semester: 1,
    begin: 8,
    end: 17,
    days: [new Date('2025-03-01'), new Date('2025-03-03')],
    title: '스터디 그룹 A',
    leaderUserProfileId: 0,
    schedule: [
      {
        timeBlock: {
          day: new Date('2025-03-01'),
          timeIndex: 0,
          startTime: '08:00',
          endTime: '08:30',
          duration: 1, // 30 minutes
        },
        availableMembers: ['user1', 'user2'],
        unavailableMembers: [],
      },
      {
        timeBlock: {
          day: new Date('2025-03-03'),
          timeIndex: 1,
          startTime: '09:00',
          endTime: '09:30',
          duration: 1, // 30 minutes
        },
        availableMembers: ['user2', 'user3'],
        unavailableMembers: [],
      },
    ],
    maxMember: 2,
    members: [
      {
        id: 1,
        userId: 1001,
        studentNumber: '20230001',
        name: 'Alice',
        availableTimeBlock: [
          {
            day: new Date('2025-03-01'),
            timeIndex: 0,
            startTime: '08:00',
            endTime: '08:30',
            duration: 1, // 30 minutes
          },
        ],
      },
      {
        id: 2,
        userId: 1002,
        studentNumber: '20230002',
        name: 'Bob',
        availableTimeBlock: [
          {
            day: new Date('2025-03-03'),
            timeIndex: 1,
            startTime: '09:00',
            endTime: '09:30',
            duration: 1, // 30 minutes
          },
        ],
      },
    ],
  },
  {
    id: 2,
    year: 2025,
    semester: 2,
    begin: 10,
    end: 18,
    days: [new Date('2025-03-10')],
    title: '팀 프로젝트 미팅',
    leaderUserProfileId: 0,
    schedule: [
      {
        timeBlock: {
          day: new Date('2025-03-10'),
          timeIndex: 2,
          startTime: '10:00',
          endTime: '10:30',
          duration: 1, // 30 minutes
        },
        availableMembers: ['user4'],
        unavailableMembers: [],
      },
    ],
    maxMember: 2,
    members: [
      {
        id: 3,
        userId: 1003,
        studentNumber: '20230003',
        name: 'Charlie',
        availableTimeBlock: [
          {
            day: new Date('2025-03-10'),
            timeIndex: 2,
            startTime: '10:00',
            endTime: '10:30',
            duration: 1, // 30 minutes
          },
        ],
      },
      {
        id: 4,
        userId: 1004,
        studentNumber: '20230004',
        name: 'David',
        availableTimeBlock: [
          {
            day: new Date('2025-03-10'),
            timeIndex: 2,
            startTime: '10:00',
            endTime: '10:30',
            duration: 1, // 30 minutes
          },
        ],
      },
    ],
  },
  {
    id: 3,
    year: 2025,
    semester: 1,
    begin: 13,
    end: 20,
    days: [new Date('2025-03-02')],
    title: '모임 그룹 B',
    leaderUserProfileId: 103,
    schedule: [
      {
        timeBlock: {
          day: new Date('2025-03-02'),
          timeIndex: 5,
          startTime: '13:00',
          endTime: '13:30',
          duration: 1, // 30 minutes
        },
        availableMembers: ['user1'],
        unavailableMembers: [],
      },
    ],
    maxMember: 1,
    members: [
      {
        id: 5,
        userId: 1005,
        studentNumber: '20230005',
        name: 'Eve',
        availableTimeBlock: [
          {
            day: new Date('2025-03-02'),
            timeIndex: 5,
            startTime: '13:00',
            endTime: '13:30',
            duration: 1, // 30 minutes
          },
        ],
      },
    ],
  },
  {
    id: 4,
    year: 2025,
    semester: 1,
    begin: 9,
    end: 17,
    days: [new Date('2025-03-04')],
    title: '워크숍 그룹 C',
    leaderUserProfileId: 104,
    schedule: [
      {
        timeBlock: {
          day: new Date('2025-03-04'),
          timeIndex: 1,
          startTime: '09:00',
          endTime: '09:30',
          duration: 1, // 30 minutes
        },
        availableMembers: ['user3'],
        unavailableMembers: [],
      },
    ],
    maxMember: 4,
    members: [
      {
        id: 6,
        userId: 1006,
        studentNumber: '20230006',
        name: 'Frank',
        availableTimeBlock: [
          {
            day: new Date('2025-03-04'),
            timeIndex: 1,
            startTime: '09:00',
            endTime: '09:30',
            duration: 1, // 30 minutes
          },
        ],
      },
    ],
    result: {
      id: 4,
      group_id: 4,
      year: 2025,
      semester: 1,
      available_members: ['user3'],
      unavailable_members: ['user4'],
      title: '워크숍 그룹 C 일정',
      timeBlocks: [
        {
          day: new Date('2025-03-04'),
          timeIndex: 1,
          startTime: '09:00',
          endTime: '09:30',
          duration: 1, // 30 minutes
        },
      ],
      place: 'Workshop Room',
      description: '워크숍 그룹 C 진행',
    },
  },
  {
    id: 5,
    year: 2025,
    semester: 2,
    begin: 11,
    end: 16,
    days: [new Date('2025-03-05')],
    title: '개발자 모임 D',
    leaderUserProfileId: 105,
    schedule: [
      {
        timeBlock: {
          day: new Date('2025-03-05'),
          timeIndex: 4,
          startTime: '11:00',
          endTime: '11:30',
          duration: 1, // 30 minutes
        },
        availableMembers: ['user5'],
        unavailableMembers: [],
      },
    ],
    maxMember: 6,
    members: [
      {
        id: 7,
        userId: 1007,
        studentNumber: '20230007',
        name: 'Grace',
        availableTimeBlock: [
          {
            day: new Date('2025-03-05'),
            timeIndex: 4,
            startTime: '11:00',
            endTime: '11:30',
            duration: 1, // 30 minutes
          },
        ],
      },
    ],
  },
  {
    id: 6,
    year: 2025,
    semester: 1,
    begin: 14,
    end: 21,
    days: [new Date('2025-03-06')],
    title: '디자인 그룹 E',
    leaderUserProfileId: 106,
    schedule: [
      {
        timeBlock: {
          day: new Date('2025-03-06'),
          timeIndex: 6,
          startTime: '14:00',
          endTime: '14:30',
          duration: 1, // 30 minutes
        },
        availableMembers: ['user2'],
        unavailableMembers: [],
      },
    ],
    maxMember: 5,
    members: [
      {
        id: 8,
        userId: 1008,
        studentNumber: '20230008',
        name: 'Hannah',
        availableTimeBlock: [
          {
            day: new Date('2025-03-06'),
            timeIndex: 6,
            startTime: '14:00',
            endTime: '14:30',
            duration: 1, // 30 minutes
          },
        ],
      },
    ],
  },
  {
    id: 7,
    year: 2025,
    semester: 2,
    begin: 15,
    end: 20,
    days: [new Date('2025-03-07')],
    title: '게임 모임 F',
    leaderUserProfileId: 107,
    schedule: [
      {
        timeBlock: {
          day: new Date('2025-03-07'),
          timeIndex: 0,
          startTime: '15:00',
          endTime: '15:30',
          duration: 1, // 30 minutes
        },
        availableMembers: ['user7'],
        unavailableMembers: [],
      },
    ],
    maxMember: 3,
    members: [
      {
        id: 9,
        userId: 1009,
        studentNumber: '20230009',
        name: 'Ian',
        availableTimeBlock: [
          {
            day: new Date('2025-03-07'),
            timeIndex: 0,
            startTime: '15:00',
            endTime: '15:30',
            duration: 1, // 30 minutes
          },
        ],
      },
    ],
  },
];

export default mockMeetingGroups;
