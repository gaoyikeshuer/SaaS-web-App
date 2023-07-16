export const colorTokens = {
    gray:{
        0: '#FFFFFF',
        10:'#F6F6F6',
        50:'#F0F0F0',
        100:'#E0E0E0',
        200:'#C2C2C2',
        300:'#A3A3A3',
    },
    primary:{
        50:'#83d18d',
        500:'#60bf70',
        700:'#56af68',
    },
}

export const themeSettings = (mode) =>{
    return {
        palette: {
            primary:{
                dark: colorTokens.primary[700],
                main: colorTokens.primary[500],
                light:colorTokens.primary[50],
            },
            neutral:{
                dark: colorTokens.primary[700],
                main: colorTokens.primary[500],
                light:colorTokens.primary[50],
                mediumMain:colorTokens.primary[500],
                medium:colorTokens.primary[500],
            },
            background:{
                default: colorTokens.gray[10],
                alt: colorTokens.gray[0],
            },
        },
        typography:{
            fontsize:12,
            h1:{
                fontsize:40
            },
            h2:{
                fontsize:32
            },
            h4:{
                fontsize: 26,
            },
            h5:{
                fontsize:16
            },
            h6:{
                fontsize:14
            }
        }

    }
}