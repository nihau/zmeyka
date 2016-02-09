cd ./zmeyka-src/
#cat random.js colors.js helper.js point.js customEvent.js zmeyka_model.js zmeyka_controller.js zmeyka_view.js | uglifyjs --mangle --compress --wrap > ../zmeyka.ugly.js
cat random.js colors.js helper.js point.js customEvent.js notifyable.js gameobject.js ./model/snake.js ./model/board.js ./model/zmeyka_model.js zmeyka_controller.js zmeyka_view.js > ../zmeyka.ugly.js
