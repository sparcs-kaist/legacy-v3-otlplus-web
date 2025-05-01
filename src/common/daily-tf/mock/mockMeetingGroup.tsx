import { MeetingGroup } from '../interface/groupInfoType';

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
          { day: new Date('2025-03-01'), timeIndex: 0, startTime: '08:00', endTime: '08:30' },
        ],
      },
      {
        id: 2,
        userId: 1002,
        studentNumber: '20230002',
        name: 'Bob',
        availableTimeBlock: [
          { day: new Date('2025-03-03'), timeIndex: 1, startTime: '09:00', endTime: '09:30' },
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
          { day: new Date('2025-03-10'), timeIndex: 2, startTime: '10:00', endTime: '10:30' },
        ],
      },
      {
        id: 4,
        userId: 1004,
        studentNumber: '20230004',
        name: 'David',
        availableTimeBlock: [
          { day: new Date('2025-03-10'), timeIndex: 2, startTime: '10:00', endTime: '10:30' },
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
          { day: new Date('2025-03-02'), timeIndex: 5, startTime: '13:00', endTime: '13:30' },
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
          { day: new Date('2025-03-04'), timeIndex: 1, startTime: '09:00', endTime: '09:30' },
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
        { day: new Date('2025-03-04'), timeIndex: 1, startTime: '09:00', endTime: '09:30' },
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
          { day: new Date('2025-03-05'), timeIndex: 4, startTime: '11:00', endTime: '11:30' },
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
          { day: new Date('2025-03-06'), timeIndex: 6, startTime: '14:00', endTime: '14:30' },
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
    title: '분석 팀 F',
    leaderUserProfileId: 107,
    schedule: [
      {
        timeBlock: {
          day: new Date('2025-03-07'),
          timeIndex: 7,
          startTime: '15:00',
          endTime: '15:30',
        },
        availableMembers: ['user4'],
        unavailableMembers: [],
      },
    ],
    maxMember: 6,
    members: [
      {
        id: 9,
        userId: 1009,
        studentNumber: '20230009',
        name: 'Ivy',
        availableTimeBlock: [
          { day: new Date('2025-03-07'), timeIndex: 7, startTime: '15:00', endTime: '15:30' },
        ],
      },
    ],
  },
  {
    id: 8,
    year: 2025,
    semester: 1,
    begin: 12,
    end: 18,
    days: [new Date('2025-03-08')],
    title: '미술 모임 G',
    leaderUserProfileId: 108,
    schedule: [
      {
        timeBlock: {
          day: new Date('2025-03-08'),
          timeIndex: 3,
          startTime: '12:00',
          endTime: '12:30',
        },
        availableMembers: ['user2'],
        unavailableMembers: [],
      },
    ],
    maxMember: 4,
    members: [
      {
        id: 10,
        userId: 1010,
        studentNumber: '20230010',
        name: 'Jack',
        availableTimeBlock: [
          { day: new Date('2025-03-08'), timeIndex: 3, startTime: '12:00', endTime: '12:30' },
        ],
      },
    ],
    result: {
      id: 8,
      group_id: 8,
      year: 2025,
      semester: 1,
      available_members: ['user2'],
      unavailable_members: ['user3'],
      title: '미술 모임 G 일정',
      timeBlocks: [
        { day: new Date('2025-03-08'), timeIndex: 3, startTime: '12:00', endTime: '12:30' },
      ],
      place: 'Art Room',
      description: '미술 모임 G 미팅',
    },
  },
  {
    id: 9,
    year: 2025,
    semester: 2,
    begin: 16,
    end: 19,
    days: [new Date('2025-03-09')],
    title: '게임 모임 H',
    leaderUserProfileId: 109,
    schedule: [
      {
        timeBlock: {
          day: new Date('2025-03-09'),
          timeIndex: 8,
          startTime: '16:00',
          endTime: '16:30',
        },
        availableMembers: ['user1'],
        unavailableMembers: [],
      },
    ],
    maxMember: 5,
    members: [
      {
        id: 11,
        userId: 1011,
        studentNumber: '20230011',
        name: 'Lily',
        availableTimeBlock: [
          { day: new Date('2025-03-09'), timeIndex: 8, startTime: '16:00', endTime: '16:30' },
        ],
      },
    ],
    result: {
      id: 9,
      group_id: 9,
      year: 2025,
      semester: 2,
      available_members: ['user1'],
      unavailable_members: ['user2'],
      title: '게임 모임 H 일정',
      timeBlocks: [
        { day: new Date('2025-03-09'), timeIndex: 8, startTime: '16:00', endTime: '16:30' },
      ],
      place: 'Game Room',
      description: '게임 모임 H',
    },
  },
];

export default mockMeetingGroups;
