import matplotlib.pyplot as plt

DATA_ARRAY = [[207, 245], [233, 289], [294, 334], [154, 192], [345, 371], [119, 150], [73, 104], [20, 72]]
ANGLE_ARRAY = [0, 1, 2, 3, 5, 6, 7, 8]
MATRIX_ARRAY = [331, 332, 333, 334, 336, 337, 338, 339]
colors = ['orange', 'lightgray']
explode = [0.05, 0.05]

plt.subplots_adjust(left=0.03,
                    bottom=0.03, 
                    right=0.97, 
                    top=0.97, 
                    wspace=0.0, 
                    hspace=0.0)

for index in range(0, 8) :
    plt.subplot(MATRIX_ARRAY[index])
    plt.axhline(0.0, 0.0, 1.0, color='gray', linestyle='--', linewidth=1)
    plt.axvline(0.0, 0.0, 1.0, color='gray', linestyle='--', linewidth=1)
    data = DATA_ARRAY[index]
    portion = data[1] - data[0]
    ratio = [portion, 360 - portion]
    startangle = -data[0]
    label = '%d° ~ %d°' % (data[0], data[1])
    labels = [label, '']
    plt.pie(ratio, labels=labels, autopct='%.1f%%', startangle=startangle, counterclock=False, colors=colors, textprops={'size':7}, explode=explode)

plt.show()