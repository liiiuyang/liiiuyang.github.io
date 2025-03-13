new Vue({
    el: '#app',
    data: {
      currentStep: 'quiz', // 当前步骤：'quiz' 或 'result'
      quizQuestions: [],   // 存储随机生成的题目
      userAnswers: [],     // 用户的答案
      correctCount: 0,     // 答对的题目数量
      currentQuestionIndex: 0, // 当前题目索引
      userAnswer: null,    // 用户当前题目的答案
      showAnswer: false,   // 是否显示答案
      isCorrect: false     // 当前题目是否回答正确
    },
    created() {
      this.generateQuiz();
    },
    computed: {
      // 获取当前题目
      currentQuestion() {
        return this.quizQuestions[this.currentQuestionIndex];
      }
    },
    methods: {
      // 随机生成 50 道题目
      generateQuiz() {
        const questions = [
            { question: "JavaScript 是一种什么语言？", options: ["编译型语言", "解释型语言", "标记语言", "数据库语言"], answer: "解释型语言" },
            { question: "Vue.js 是一个什么框架？", options: ["后端框架", "前端框架", "数据库框架", "操作系统"], answer: "前端框架" },
            { question: "CSS 的全称是什么？", options: ["Cascading Style Sheets", "Creative Style System", "Computer Style Script", "Centralized Style Syntax"], answer: "Cascading Style Sheets" },
            { question: "HTML 的全称是什么？", options: ["HyperText Markup Language", "HighText Machine Language", "HyperTool Multi Language", "HyperText Machine Learning"], answer: "HyperText Markup Language" },
            { question: "以下哪个是 JavaScript 的数据类型？", options: ["String", "Array", "Object", "以上都是"], answer: "以上都是" },
            { question: "以下哪个方法可以用来添加数组元素？", options: ["push()", "pop()", "shift()", "unshift()"], answer: "push()" },
            { question: "以下哪个不是 Vue 的生命周期钩子？", options: ["beforeCreate", "created", "beforeMount", "afterDestroy"], answer: "afterDestroy" },
            { question: "以下哪个是正确的 JSON 格式？", options: ['{"name": "John"}', "{'name': 'John'}", "[name: 'John']", "<name>John</name>"], answer: '{"name": "John"}' },
            { question: "以下哪个是 CSS 中的伪类？", options: ["hover", "active", "focus", "以上都是"], answer: "以上都是" },
            { question: "以下哪个是 HTTP 请求方法？", options: ["GET", "POST", "PUT", "以上都是"], answer: "以上都是" },
            { question: "JavaScript 中的 == 和 === 的区别是什么？", options: ["== 比较值，=== 比较值和类型", "== 比较类型，=== 比较值", "没有区别", "以上都不对"], answer: "== 比较值，=== 比较值和类型" },
            { question: "以下哪个是 JavaScript 的内置对象？", options: ["Math", "Date", "Array", "以上都是"], answer: "以上都是" },
            { question: "以下哪个是 Vue 的模板语法？", options: ["{{ }}", "[ ]", "( )", "{ }"], answer: "{{ }}" },
            { question: "以下哪个是 JavaScript 的闭包特性？", options: ["函数嵌套", "作用域链", "以上都是", "以上都不是"], answer: "以上都是" },
            { question: "以下哪个是 JavaScript 的事件循环机制？", options: ["宏任务和微任务", "单线程模型", "以上都是", "以上都不是"], answer: "以上都是" },
            { question: "以下哪个是 JavaScript 的 Promise 状态？", options: ["pending", "fulfilled", "rejected", "以上都是"], answer: "以上都是" },
            { question: "以下哪个是 JavaScript 的异步编程方式？", options: ["回调函数", "Promise", "async/await", "以上都是"], answer: "以上都是" },
            { question: "以下哪个是 CSS 的布局方式？", options: ["Flexbox", "Grid", "Float", "以上都是"], answer: "以上都是" },
            { question: "以下哪个是 HTML5 的新特性？", options: ["语义化标签", "Canvas", "Web Storage", "以上都是"], answer: "以上都是" },
            { question: "以下哪个是 HTTP 状态码？", options: ["200", "404", "500", "以上都是"], answer: "以上都是" },
            { question: "以下哪个是 RESTful API 的特点？", options: ["无状态", "统一接口", "可缓存", "以上都是"], answer: "以上都是" },
            { question: "以下哪个是 JavaScript 的模块化方案？", options: ["CommonJS", "AMD", "ES Modules", "以上都是"], answer: "以上都是" },
            { question: "以下哪个是 Vue 的核心概念？", options: ["组件", "指令", "响应式系统", "以上都是"], answer: "以上都是" },
            { question: "以下哪个是 JavaScript 的原型链？", options: ["__proto__", "prototype", "constructor", "以上都是"], answer: "以上都是" },
            { question: "以下哪个是 JavaScript 的立即执行函数？", options: ["(function() { })();", "function() { }();", "以上都是", "以上都不是"], answer: "(function() { })();" },
            { question: "以下哪个是 JavaScript 的深拷贝方法？", options: ["JSON.parse(JSON.stringify())", "Object.assign()", "以上都是", "以上都不是"], answer: "JSON.parse(JSON.stringify())" },
            { question: "以下哪个是 JavaScript 的防抖函数？", options: ["setTimeout", "clearTimeout", "以上都是", "以上都不是"], answer: "以上都是" },
            { question: "以下哪个是 JavaScript 的节流函数？", options: ["setInterval", "clearInterval", "以上都是", "以上都不是"], answer: "以上都是" },
            { question: "以下哪个是 JavaScript 的正则表达式？", options: ["/pattern/", "new RegExp()", "以上都是", "以上都不是"], answer: "以上都是" },
            { question: "以下哪个是 JavaScript 的代理对象？", options: ["Proxy", "Reflect", "以上都是", "以上都不是"], answer: "以上都是" },
            { question: "以下哪个是 JavaScript 的 Map 数据结构？", options: ["键值对集合", "有序集合", "以上都是", "以上都不是"], answer: "以上都是" },
            { question: "以下哪个是 JavaScript 的 Set 数据结构？", options: ["唯一值集合", "无序集合", "以上都是", "以上都不是"], answer: "以上都是" },
            { question: "以下哪个是 JavaScript 的 Symbol 类型？", options: ["唯一标识符", "不可变值", "以上都是", "以上都不是"], answer: "以上都是" },
            { question: "以下哪个是 JavaScript 的 WeakMap 数据结构？", options: ["弱引用键值对集合", "无序集合", "以上都是", "以上都不是"], answer: "以上都是" },
            { question: "以下哪个是 JavaScript 的 WeakSet 数据结构？", options: ["弱引用唯一值集合", "无序集合", "以上都是", "以上都不是"], answer: "以上都是" },
            { question: "以下哪个是 JavaScript 的 BigInt 类型？", options: ["大整数", "任意精度整数", "以上都是", "以上都不是"], answer: "以上都是" },
            { question: "以下哪个是 JavaScript 的 TypedArray？", options: ["Int8Array", "Uint8Array", "Float32Array", "以上都是"], answer: "以上都是" },
            { question: "以下哪个是 JavaScript 的 ArrayBuffer？", options: ["二进制数据缓冲区", "字节数组", "以上都是", "以上都不是"], answer: "以上都是" },
            { question: "以下哪个是 JavaScript 的 DataView？", options: ["视图操作二进制数据", "字节操作", "以上都是", "以上都不是"], answer: "以上都是" },
            { question: "以下哪个是 JavaScript 的 WebAssembly？", options: ["高性能二进制格式", "低级语言支持", "以上都是", "以上都不是"], answer: "以上都是" },
            { question: "以下哪个是 JavaScript 的 Worker？", options: ["多线程支持", "后台任务", "以上都是", "以上都不是"], answer: "以上都是" },
            { question: "以下哪个是 JavaScript 的 Service Worker？", options: ["离线缓存", "推送通知", "以上都是", "以上都不是"], answer: "以上都是" },
            { question: "以下哪个是 JavaScript 的 Fetch API？", options: ["HTTP 请求", "Promise 支持", "以上都是", "以上都不是"], answer: "以上都是" },
            { question: "以下哪个是 JavaScript 的 Axios 库？", options: ["HTTP 请求库", "Promise 支持", "以上都是", "以上都不是"], answer: "以上都是" }
          ];    
  
        // 随机打乱题目顺序并取前 50 道
        this.quizQuestions = questions.sort(() => Math.random() - 0.5).slice(0, 50);
        this.userAnswers = Array(this.quizQuestions.length).fill(null); // 初始化用户答案数组
        this.resetCurrentQuestion();
      },
      // 检查答案
      checkAnswer() {
        if (!this.userAnswer) {
          this.$message.warning("请选择一个答案！");
          return;
        }
        this.showAnswer = true;
        this.isCorrect = this.userAnswer === this.currentQuestion.answer;
        this.userAnswers[this.currentQuestionIndex] = this.isCorrect;
        if (this.isCorrect) {
          this.correctCount++;
          this.$message.success("回答正确！");
        } else {
          this.$message.error("回答错误！");
        }
      },
      // 下一题
      nextQuestion() {
        if (this.currentQuestionIndex < this.quizQuestions.length - 1) {
          this.currentQuestionIndex++;
          this.resetCurrentQuestion();
        } else {
          this.currentStep = 'result';
        }
      },
      // 重置当前题目状态
      resetCurrentQuestion() {
        this.userAnswer = null;
        this.showAnswer = false;
        this.isCorrect = false;
      },
      // 重新开始测试
      restartQuiz() {
        this.currentStep = 'quiz';
        this.generateQuiz();
        this.correctCount = 0;
      }
    }
  });