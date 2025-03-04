const GAME_CONFIG = {
    // 游戏配置
    GAME_SETTINGS: {
        questionsPerGame: 6,    // 每局游戏的问题数量
        minQuestionInterval: 2, // 同一问题最少间隔多少轮才会重复
        fadeTime: 800,         // 场景切换动画时长（毫秒）
        choiceDelay: 1000      // 选择后等待时间（毫秒）
    },

    // 诗词数据
    POEMS: {
        FARM: {
            title: "四时田园杂兴",
            author: "范成大",
            content: "昼出耘田夜绩麻，村庄儿女各当家。\n童孙未解供耕织，也傍桑阴学种瓜。",
            type: "田园",
            background: "一首描写农村生活的诗，展现了田园生活的恬淡与农耕文化的传承。"
        },
        ICE: {
            title: "稚子弄冰",
            author: "杨万里",
            content: "稚子金盆脱晓冰，彩丝穿取当银钲。\n敲成玉磬穿林响，忽作玻璃碎地声。",
            type: "童趣",
            background: "描写孩童玩冰的天真趣事，体现了生活中的童趣与纯真。"
        },
        VILLAGE: {
            title: "村晚",
            author: "雷震",
            content: "草满池塘水满陂，山衔落日浸寒漪。\n牧童归去横牛背，短笛无腔信口吹。",
            type: "田园",
            background: "描绘了一幅恬静优美的乡村黄昏图景，展现了闲适自在的生活态度。"
        },
        BATTLE: {
            title: "从军行",
            author: "王昌龄",
            content: "青海长云暗雪山，孤城遥望玉门关。\n黄沙百战穿金甲，不破楼兰终不还。",
            type: "边塞",
            background: "描写边塞将士保家卫国的豪情壮志，展现了战士们的爱国情怀。"
        },
        AUTUMN: {
            title: "秋夜将晓出篱门迎凉有感",
            author: "陆游",
            content: "三万里河东入海，五千仞岳上摩天。\n遗民泪尽胡尘里，南望王师又一年。",
            type: "忧思",
            background: "抒发了诗人对国家命运的深切忧虑，体现了强烈的爱国情怀。"
        },
        SPRING: {
            title: "乡村四月",
            author: "翁卷",
            content: "绿遍山原白满川，子规声里雨如烟。\n乡村四月闲人少，才了蚕桑又插田。",
            type: "农事",
            background: "描写农村春季农忙景象，展现了农民勤劳奋进的精神。"
        }
    },

    // 问题场景配置
    QUESTIONS: [
        // 田园场景的问题
        {
            scene: "farm",
            text: "面对田园生活，你更向往...",
            choices: [
                { text: "在农田中耕种劳作", poem: "FARM", line: "昼出耘田夜绩麻" },
                { text: "看着孩童天真玩耍", poem: "ICE", line: "稚子金盆脱晓冰" }
            ]
        },
        {
            scene: "farm",
            text: "如果你是范成大，看到孩子在田间玩耍，你会...",
            choices: [
                { text: "欣慰地教他们农事", poem: "FARM", line: "也傍桑阴学种瓜" },
                { text: "回忆自己的童年趣事", poem: "ICE", line: "敲成玉磬穿林响" }
            ]
        },
        {
            scene: "farm",
            text: "农忙时节，你会选择...",
            choices: [
                { text: "专注于耕织农事", poem: "SPRING", line: "才了蚕桑又插田" },
                { text: "享受田园生活的闲适", poem: "VILLAGE", line: "草满池塘水满陂" }
            ]
        },

        // 冰雪场景的问题
        {
            scene: "ice",
            text: "看到冬日冰雪，你会...",
            choices: [
                { text: "和孩童一起玩耍", poem: "ICE", line: "彩丝穿取当银钲" },
                { text: "想起边关的戍守", poem: "BATTLE", line: "青海长云暗雪山" }
            ]
        },
        {
            scene: "ice",
            text: "作为杨万里，看到孩童在冰上玩耍，你会想到...",
            choices: [
                { text: "童趣带来的纯真快乐", poem: "ICE", line: "忽作玻璃碎地声" },
                { text: "人生百态的深刻哲理", poem: "AUTUMN", line: "三万里河东入海" }
            ]
        },

        // 村晚场景的问题
        {
            scene: "village",
            text: "夕阳西下时，你更愿意...",
            choices: [
                { text: "欣赏恬静的乡村景色", poem: "VILLAGE", line: "山衔落日浸寒漪" },
                { text: "思考家国的命运", poem: "AUTUMN", line: "南望王师又一年" }
            ]
        },
        {
            scene: "village",
            text: "听到牧童的笛声，你会...",
            choices: [
                { text: "感受生活的自在", poem: "VILLAGE", line: "短笛无腔信口吹" },
                { text: "想到边关的号角", poem: "BATTLE", line: "孤城遥望玉门关" }
            ]
        },

        // 战场场景的问题
        {
            scene: "battle",
            text: "面对国家危难，你会...",
            choices: [
                { text: "毅然决然投身战场", poem: "BATTLE", line: "不破楼兰终不还" },
                { text: "在田间默默耕耘", poem: "SPRING", line: "乡村四月闲人少" }
            ]
        },
        {
            scene: "battle",
            text: "身为王昌龄，驻守边关时，你最想...",
            choices: [
                { text: "建功立业，保家卫国", poem: "BATTLE", line: "黄沙百战穿金甲" },
                { text: "思念故乡的田园生活", poem: "FARM", line: "村庄儿女各当家" }
            ]
        },

        // 生活态度类问题
        {
            scene: "village",
            text: "你更欣赏哪种生活态度？",
            choices: [
                { text: "随遇而安，知足常乐", poem: "VILLAGE", line: "牧童归去横牛背" },
                { text: "心系天下，忧国忧民", poem: "AUTUMN", line: "五千仞岳上摩天" }
            ]
        },
        {
            scene: "farm",
            text: "在和平年代，你认为应该...",
            choices: [
                { text: "安心务农，充实生活", poem: "FARM", line: "童孙未解供耕织" },
                { text: "心怀家国，勤勉上进", poem: "SPRING", line: "才了蚕桑又插田" }
            ]
        }
    ],

    // 结局配置
    ENDINGS: {
        FARM: {
            title: "归隐田园",
            image: "01.png",
            quote: "此心安处是吾乡",
            description: "你选择了归隐田园的生活，在农耕中找到了内心的平静。日出而作，日落而息，随四季变迁，与自然相伴。"
        },
        ICE: {
            title: "赤子童心",
            image: "02.png",
            quote: "愿你永远保有好奇的眼睛",
            description: "你保持着纯真的童心，对世界充满好奇与热爱。在简单中发现快乐，在平凡中寻找趣味。"
        },
        VILLAGE: {
            title: "逍遥散人",
            image: "03.png",
            quote: "闲看庭前花开花落",
            description: "你选择了随性自在的生活方式，不被世俗所困，保持着自己的节奏，享受生活的点滴。"
        },
        BATTLE: {
            title: "铁血将军",
            image: "04.png",
            quote: "一寸山河一寸血",
            description: "你选择了保家卫国的道路，以军人的担当守护着国家的安宁，展现了巾帼不让须眉的豪情。"
        },
        AUTUMN: {
            title: "忧国志士",
            image: "05.png",
            quote: "位卑未敢忘忧国",
            description: "你心系天下，始终关注着国家的命运。虽位卑力微，但仍怀济世之志，展现了知识分子的担当。"
        },
        SPRING: {
            title: "勤勉主事",
            image: "06.png",
            quote: "天道酬勤终有时",
            description: "你选择了踏实勤勉的人生态度，相信付出终有回报。无论身处何方，都以认真负责的态度对待生活与工作。"
        }
    }
};

// 确保全局可访问
window.GAME_CONFIG = GAME_CONFIG;