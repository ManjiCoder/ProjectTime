export enum appInfo {
  title = 'ProjectTime',
  desc = 'ProjectTime is a straightforward web app designed for solo users to efficiently track projects and manage their time. Log hours, monitor progress, and visualize tasks easily, helping you stay organized and boost your productivity.',
}

export enum cycles {
  work = 25,
  intensiveFocus = 45,
  deepWork = 60,
}

export const defaultTimeData = {
  cycles: {
    '25min': {
      name: 'Work',
      duration: 1500,
      count: 0,
      isRunning: false,
      timeSpent: {
        sec: 0,
        total: 0,
      },
    },
    '45min': {
      name: 'Intensive Focus',
      duration: 2700,
      count: 0,
      isRunning: false,
      timeSpent: {
        sec: 0,
        total: 0,
      },
    },
    '60min': {
      name: 'Deep Work',
      duration: 3600,
      count: 0,
      isRunning: false,
      timeSpent: {
        sec: 0,
        total: 0,
      },
    },
  },
  totalTime: 0,
};
