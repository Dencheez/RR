import React from 'react';
import { motion } from 'framer-motion';

const RiyadhLogo = () => {
    // 1. Анимация прорисовки пути: линия рисуется, затем эффектно появляется заливка
    const drawEffect = {
        hidden: { pathLength: 0, opacity: 0, fillOpacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            fillOpacity: [0, 0, 1], // Начинается прозрачной, затем вспыхивает
            transition: {
                pathLength: { duration: 1.2, ease: [0.2, 0.8, 0.4, 1] }, // Быстрый старт и замедление в конце
                opacity: { duration: 0.4 },
                fillOpacity: { delay: 1.3, duration: 1.0, ease: "easeOut" }
            }
        }
    };
    //анимация свечения
    const glowVariants = {
        hidden: {
            filter: "drop-shadow(0 0 0px rgba(241, 191, 39, 0))",
            scale: 0.90
        },
        visible: {
            filter: [
                "drop-shadow(0 0 10px rgba(200, 160, 40, 0.5))",
                "drop-shadow(0 0 100px rgba(241, 191, 39, 1))",
                "drop-shadow(0 0 35px rgba(241, 191, 39, 0.6))"
            ],
            scale: [0.90, 1.05, 1],
            transition: {
                duration: 1.0,
                ease: "easeOut",
                times: [0, 0.6, 1]
            }
        }
    };

    return (
        <div style={{
            background: 'radial-gradient(circle at center, #1f1a0b 0%, #000000 80%)',
            minHeight: '100vh',
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
        }}>
            <motion.div
                className="absolute inset-0 z-0 bg-[url('/sparkles.png')] bg-cover opacity-20"
                animate={{ scale: [1, 1.1, 1], opacity: [0, 0.3, 0] }}
                transition={{ duration: 4.5, ease: "easeInOut" }}
            />

            <motion.svg
                width="600"
                height="auto"
                viewBox="0 0 1927 1536"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                variants={glowVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10"
            >
                <defs>
                    {/* Градиент заливки переливается золотом опускается и поднимается свет */}
                    <motion.linearGradient
                        id="powerfulGold"
                        x1="0%" y1="0%"
                        animate={{ x2: ["200%", "-100%"], y2: ["200%", "-100%"] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <stop offset="0%" stopColor="#A8811A" />
                        <stop offset="30%" stopColor="#F1BF27" />
                        <stop offset="50%" stopColor="#FFFFFF" /> {/* Блик */}
                        <stop offset="70%" stopColor="#F1BF27" />
                        <stop offset="100%" stopColor="#8A6B1C" />
                    </motion.linearGradient>

                    {/* Яркий бегущий блик прямо на линии обводки */}
                    <motion.linearGradient
                        id="strokeGlow"
                        x1="-100%" y1="-100%"
                        animate={{ x1: ["-100%", "200%"], y1: ["-100%", "200%"], x2: ["0%", "300%"], y2: ["0%", "300%"] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                    >
                        <stop offset="0%" stopColor="#C9A227" />
                        <stop offset="50%" stopColor="#FFFFFF" />
                        <stop offset="100%" stopColor="#C9A227" />
                    </motion.linearGradient>

                    <clipPath id="clip0_246_462">
                        <rect width="1927" height="1536" fill="white" />
                    </clipPath>
                </defs>

                <g clipPath="url(#clip0_246_462)">
                    <motion.path
                        d="M1295.16 789.583L1405.24 730.844L1320.23 598.25V524.137L1440.64 711.953L1893.57 470.282L1926.69 452.606L1922.88 489.959L1847.63 1226.91L1844.43 1258.26L1817.42 1242.01L1705.04 1174.39V1387.28L1912.42 1498.21L1902.98 1535.84H0L65.0234 1498.5L252.93 1390.58V1175.93L152.156 1241.63L124.292 1259.8L121.313 1226.67L55.0635 489.718L51.7266 452.596L84.5039 470.339L522.759 707.568L641.233 523.235V597.215L558.034 726.663L667.316 785.818V0H1295.16V789.583ZM437.016 1470.73H1540.32L1252.48 1198.44H723.844L437.016 1470.73ZM292.93 1153.77V1367.1L471.869 1261.34V1098.41L292.93 1153.77ZM1489.1 1260.33L1665.04 1364.23V1153.71L1489.1 1098.52V1260.33ZM1143.26 1228.24L715.794 1254.43L924.262 1266.07L924.229 1267.07L691.229 1264.97L690.088 1264.96L690.869 1264.12L725.369 1227.4L725.517 1227.24H1143.23L1143.26 1228.24ZM511.869 1237.69L677.139 1140L681.847 1137.22H1280.62L1285.33 1140L1449.1 1236.71V1091.29H511.869V1237.69ZM1462.3 745.734L1685.3 1093.57L1625.38 1074.22L1426.9 764.625L1295.16 834.92V1051.29H1472.17L1475.09 1052.2L1691.03 1119.94L1693.31 1120.65L1695.35 1121.88L1811.04 1191.49L1879.27 523.247L1462.3 745.734ZM158.175 1189.96L262.007 1122.26L264.348 1120.74L267.019 1119.91L485.958 1052.18L488.847 1051.29H667.316V831.304L536.346 760.408L329.572 1082.13L269.576 1101.5L501.07 741.313L98.2402 523.258L158.175 1189.96ZM707.316 1051.29H927.166L707.316 862.868V1051.29ZM1035.89 1051.29H1255.16V866.007L1035.89 1051.29ZM1255.16 78.8975C1201.49 216.387 1156.99 322.727 1117.15 396.421C1095.59 436.305 1074.79 467.795 1053.85 489.669C1033 511.456 1009.9 525.879 983.92 526.549C957.78 527.222 934.277 513.849 913.003 492.702C891.72 471.546 870.536 440.561 848.548 400.888C807.94 327.62 762.371 220.556 707.316 80.0703V810.188L981.326 1045.02L1255.16 813.64V78.8975ZM977.016 81.877C910.681 81.9308 844.607 91.6439 762.663 111.308C809.526 228.92 848.693 318.636 883.533 381.497C904.83 419.922 923.859 447.094 941.202 464.333C958.554 481.581 972.091 486.84 982.89 486.562C993.847 486.279 1007.58 480.167 1024.96 462.013C1042.25 443.945 1061.05 416.088 1081.97 377.398C1115.94 314.557 1153.89 226.214 1199.11 112.117C1112.73 91.7068 1044.31 81.8223 977.016 81.877ZM734.612 40C739.075 51.4727 743.47 62.7221 747.803 73.7471C834.093 52.7602 904.963 41.9354 976.983 41.877C1049.94 41.8177 1123.18 52.8072 1213.92 74.5225C1218.33 63.2442 1222.82 51.7368 1227.37 40H734.612Z"
                        stroke="url(#strokeGlow)"
                        strokeWidth="3.5" // Утолщеная обводка
                        fill="url(#powerfulGold)"
                        variants={drawEffect}
                        initial="hidden"
                        animate="visible"
                        strokeLinecap="round"
                    />
                </g>
            </motion.svg>
        </div>
    );
};

export default RiyadhLogo;