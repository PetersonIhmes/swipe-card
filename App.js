import React, { Component } from 'react';
import { Animated, Dimensions, LayoutAnimation, PanResponder, StyleSheet, Text, View } from 'react-native';
const { width } = Dimensions.get('window');
const offset = width / 5;

const random = () => (parseInt(Math.random() * 150));
const randomColor = () => 'rgb(' + random() + ',' + random() + ',' + random() + ')'
let _data = [];
for (let i = 0; i < 10; i += 1) _data.push(randomColor())


export default class SwipeCard extends Component {
    constructor() {
        super()
        this.opacity = new Animated.Value(0)
        this.state = {
            data: _data
        }
    }
    removeItem = () => {
        const { data } = this.state
        let newData = [...data]
        newData.splice(0, 1)
        newData = [...newData, randomColor()]
        LayoutAnimation.easeInEaseOut()
        this.setState({ data: newData })
    }
    setAction = (color) => {
        if (color) this.containerRef?.setNativeProps({ backgroundColor: color })
        Animated.spring(this.opacity, { toValue: color ? 1 : 0, useNativeDriver: true, bounciness: 0 }).start()
    }
    render() {
        const { data } = this.state
        return (
            <View style={{ flex: 1 }} >
            <Text style={styles.title}>
            Like ❤️ Deslike ❌
            </Text>
                <Animated.View style={[StyleSheet.absoluteFill, { opacity: this.opacity }]} ref={e => this.containerRef = e} />
                <View style={styles.container}>
                    {data.map((item, index) => (
                        <Card
                            key={item} item={item}
                            i={index} removeItem={this.removeItem}
                            data={data} setAction={this.setAction}
                        />
                    ))}
                </View>
            </View>
        )
    }
}

class Card extends Component {
    constructor() {
        super();
        let isPositive = false;
        let isNegative = false;
        this.pan = new Animated.ValueXY({ x: 0, y: 0 })
        this.rotate = this.pan.x.interpolate({ inputRange: [-width, 0, width], outputRange: ['-40deg', '0deg', '40deg'] })
        this.panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => { },
            onPanResponderMove: Animated.event([null, { dx: this.pan.x }], {
                useNativeDriver: false, listener: (e, g) => {
                    const { setAction } = this.props
                    if (!isPositive && g.dx > offset) {
                        isPositive = true; setAction('#00ff0066');
                    } else if (isPositive && g.dx < offset) {
                        isPositive = false; setAction();
                    } else if (!isNegative && g.dx < -offset) {
                        isNegative = true; setAction('#ff000066');
                    } else if (isNegative && g.dx > -offset) {
                        isNegative = false; setAction();
                    }
                }
            }),
            onPanResponderRelease: (e, g) => {
                const { removeItem, setAction } = this.props
                if (Math.abs(g.vx) > 1 || Math.abs(g.dx) > offset) {
                    Animated.spring(this.pan, {
                        toValue: { x: width * 2 * (g.dx < 0 ? -1 : 1), y: 0 },
                        useNativeDriver: true,
                        bounciness: 0
                    }).start();
                    setTimeout(() => {
                        removeItem()
                    }, 100);
                } else {
                    Animated.spring(this.pan, {
                        toValue: { x: 0, y: 0 },
                        useNativeDriver: true,
                    }).start();
                }
                isPositive = false; isNegative = false; setAction();
            },
            onPanResponderTerminate: () => {
                Animated.spring(this.pan, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: true,
                }).start();
                isPositive = false; isNegative = false; setAction();
            },
        });
    }
    render() {
        const { data, i, item } = this.props
        return (
            <Animated.View style={[StyleSheet.absoluteFill, styles.center, { zIndex: data.length - i, }]}>
                <Animated.View
                    {...this.panResponder.panHandlers}
                    style={[styles.item,
                    {
                        backgroundColor: item,
                        transform: [
                            { translateX: this.pan.x },
                            { rotate: this.rotate },
                        ],
                        width: 80 - (i * 1) + '%',
                        marginTop: i * 10
                    }]}>
                    <Text style={{ color: '#fff', fontSize: 25 }}>❌ Left  or Right ❤️</Text>
                </Animated.View>
            </Animated.View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 20,
      marginTop: 40,
    },
    item: {
        height: '70%',
        borderWidth: 1,
        borderColor: '#00000055',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});
