const fs = require("fs");
const path = require("path");
const os = require("os");

const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");

const projectTypes = {
  java: {
    include: [".java"],
    exclude: [],
  },
  node: {
    include: ["package.json"],
    exclude: ["node_modules"],
  },
  flutter: {
    include: ["pubspec.yaml"],
  },
};

const ignoreSet = new Set();

Object.entries(projectTypes).forEach(([type, config]) => {
  (config.exclude || []).forEach((item) => {
    ignoreSet.add(item);
  });
});

function scanDirectory(directory) {
  try {
    const filestats = fs.statSync(directory);
    if (!filestats.isDirectory()) return;
    const files = fs.readdirSync(directory);
    const subDirectories = [];
    for (let key in files) {
      const file = files[key];
      if (ignoreSet.has(file)) continue;
      const filePath = path.join(directory, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        subDirectories.push(filePath);
      } else if (stats.isFile()) {
        // 判断文件类型
        const fileType = getFileType(file);
        if (fileType) {
          parentPort.postMessage({
            directory: directory,
            path: filePath,
            type: fileType,
          });
          return;
        }
      }
    }
    subDirectories.forEach((subDirectory) => {
      scanDirectory(subDirectory);
    });
  } catch (e) {
    console.log(e);
  }
}

function getFileType(file) {
  let result = null;
  Object.entries(projectTypes).forEach(([type, config]) => {
    config.include &&
      config.include.forEach((item) => {
        if (
          item === file ||
          (item.startsWith(".") && item === path.extname(file))
        ) {
          result = type;
        }
      });
  });
  return result;
}

if (isMainThread) {
  const computerRootDirectory = "E:\\learn"; // 要扫描的电脑根目录
  const numThreads = os.cpus().length; // 线程数

  // 将根目录分割成多个子目录
  const subDirectories = fs
    .readdirSync(computerRootDirectory)
    .map((file) => path.join(computerRootDirectory, file));

  const threadSubDirectories = [];
  for (let i = 0; i < numThreads; i++) {
    threadSubDirectories.push([]);
  }

  // 将子目录分配给不同的线程
  subDirectories.forEach((subDir, index) => {
    threadSubDirectories[index % numThreads].push(subDir);
  });

  const workers = [];

  // 创建并启动多个线程
  for (let i = 0; i < numThreads; i++) {
    workers[i] = new Worker(__filename, {
      workerData: {
        id: i,
        subDirectories: threadSubDirectories[i],
      },
    });
    workers[i].on("error", (error) => console.error(error));
  }

  // 监听子线程的消息
  let length = 0;
  const result = [];
  workers.forEach((worker, index) => {
    worker.on("message", (message) => {
      result.push(message);
    });
    worker.on("exit", () => {
      length++;
      if (length === numThreads) {
        console.log("Completed: ", result);
      }
    });
  });
} else {
  // 子线程的逻辑
  const { id, subDirectories } = workerData;
  subDirectories.forEach((directory) => {
    scanDirectory(directory);
  });
}
