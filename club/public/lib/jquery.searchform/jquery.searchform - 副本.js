(function ($) {
	$.fn.searchform = function (settings, dataTable, params) {
		if (!Array.isArray(settings)) {
			return;
		}

		var $this = $(this), $table = $(dataTable);
		settings.forEach(function (v, i) {
			switch (v.type) {
			case 'star':
				$this.append(
					'<tr>' +
					'<td class="label">' + v.label + '</td>' +
					'<td data-type="star">' +
					'<div class="layui-inline">' +
					'<span><div id="star"></div></span>' +
					'</div>' +
					'<div class="layui-inline">' +
					'<button class="layui-btn"><i class="layui-icon">&#xe615;</i>查找</button>' +
					'</div>' +
					'</td>' +
					'</tr>');
				break;
			case 'date':
				$this.append(
					'<tr>' +
					'<td class="label">' + v.label + '</td>' +
					'<td data-type="date">' +
					'<div class="layui-inline">' +
					'<input type="text" name="title" placeholder="' + v.label + '" class="layui-input" id="date">' +
					'</div>' +
					'<div class="layui-inline">' +
					'<button class="layui-btn"><i class="layui-icon">&#xe615;</i>查找</button>' +
					'</div>' +
					'</td>' +
					'</tr>');
				break;
			case 'input':
				$this.append(
					'<tr>' +
					'<td class="label">' + v.label + '</td>' +
					'<td data-type="input">' +
					'<div class="layui-inline">' +
					'<input type="text" name="title" placeholder="' + v.label + '" class="layui-input">' +
					'</div>' +
					'<div class="layui-inline">' +
					'<button class="layui-btn"><i class="layui-icon">&#xe615;</i>查找</button>' +
					'</div>' +
					'</td>' +
					'</tr>');
				break;
			case 'radio':
				v.data = JSON.parse(v.data);
				if (Array.isArray(v.data)) {
					var html =
						    '<tr>' +
						    '<td class="label">' + v.label + '</td>' +
						    '<td data-type="radio">';
					if (v.default) {
						html += '<input type="radio" lay-filter="jquery-searchform-radio" name="jquery-searchform-radio-' + i + '" value="0" title="' + v.default + '">';
					}
					v.data.forEach(function (v) {
						html += '<input type="radio" lay-filter="jquery-searchform-radio" name="jquery-searchform-radio-' + i + '" value="' + v.id + '" title="' + v.name + '">';
					});
					html +=
						'</td>' +
						'</tr>';

					html = $(html);
					$this.append(html);
					if (v.data.length == 0) {
						html.hide();
					}
				}
				break;
			case 'tree':
				v.data = JSON.parse(v.data);
				if (Array.isArray(v.data)) {
					$this.append(
						'<tr>' +
						'<td class="label">' + v.label + '</td>' +
						'<td data-type="tree">' +
						'<a href="javascript:;" data-jq-dropdown="#jquery-searchform-dropdown-' + i + '">' + v.default + '</a>' +
						'<div id="jquery-searchform-dropdown-' + i + '" class="jquery-searchform-dropdown jq-dropdown jq-dropdown-tip">' +
						'<div class="jq-dropdown-panel">' +
						'<ul id="jquery-searchform-tree-' + i + '" class="ztree"></ul>' +
						'<button class="layui-btn"><i class="layui-icon">&#xe615;</i>查找</button>' +
						'</div>' +
						'</div>' +
						'</td>' +
						'</tr>');

					$.fn.zTree.init($('#jquery-searchform-tree-' + i), {
						view : {
							showIcon: false,
							showLine: false
						},
						check: {
							enable    : true,
							chkStyle  : 'radio',
							radioType : 'all',
							chkboxType: {
								"Y": "p",
								"N": "p"
							}
						}
					}, v.data);
				}
				break;
			}
		});

		var fontsize = parseInt($this.css('font-size'));
		$.each($this.find('td.label'), function () {
			$(this).css('width', (fontsize * $(this).text().length * 2) + 'px');
		});

		var $items = $this.find('td:not(.label)'), $input = null, $date = null;
		params     = params.split('_');
		$items.each(function () {
			var $item = $(this);
			if ($item.data('type') == 'input') {
				$input = $item.find('input');
			} else if ($item.data('type') == 'date') {
				$date = $item.find('input');
			} else if ($item.data('type') == 'radio') {
				if ($item.find('input').length == 0) {
					$item.closest('tr').hide();
				} else {
					//noinspection JSDuplicatedDeclaration
					var value = params.shift(),
					    $elem = $item.data('val', value).find('input[value=' + value + ']');
					if ($elem.length > 0) {
						$elem.attr('checked', true);
					} else {
						$($item.find('input')[0]).attr('checked', true);
					}
				}
			} else if ($item.data('type') == 'tree') {
				//noinspection JSDuplicatedDeclaration
				var value = params.shift();
				$item.data('val', value);
				value     = value.split('.');
				if (value.length > 0) {
					var $tree = $.fn.zTree.getZTreeObj($item.find('.ztree')[0].id),
					    node  = $tree.getNodeByParam('id', value.pop());
					if (node) {
						$tree.checkNode(node, true, true, false);
						$tree.selectNode(node, false, false);
						//noinspection JSValidateTypes
						$item.children('a').text(node.getPath().reduce(function (res, v) {
							res.push(v.name);
							return res;
						}, []).join(' / '));
					}
					//noinspection JSValidateTypes
					$item.children('div').on('show', function () {
						if (node) {
							$tree.checkNode(node, true, true, false);
							$tree.selectNode(node, false, false);
						} else {
							$tree.checkAllNodes(false);
						}
					});
				}
			}
		});

		var page = 1, more = false;
		if (params.length >= 2) {
			page = parseInt(params.shift());
			more = parseInt(params.shift());
			if ($input) {
				$input.val(params.shift());
			}
			if ($date) {
				$date.val(params.join('_'));
			}

			if ($table.length > 0) {
				var html =
					    '<table class="jquery-searchform-page">' +
					    '<tr>' +
					    '<td><a class="jquery-searchform-prev" href="javascript:;">上一页</a></td>' +
					    '<td><a class="jquery-searchform-next" href="javascript:;">下一页</a></td>' +
					    '<td><input class="layui-input"></td>' +
					    '<td><a class="jquery-searchform-btn" href="javascript:;">跳转</a></td>' +
					    '</tr>' +
					    '</table>';
				$table.before(html).after(html);
			}

			var $page = $('.jquery-searchform-page').data('val', page);
			$('.jquery-searchform-page input').val(page);
			if (page == 1 && !more) {
				$page.css('visibility', 'hidden');
			} else {
				if (page == 1) { $('.jquery-searchform-page .jquery-searchform-prev').hide(); }
				if (!more) { $('.jquery-searchform-page .jquery-searchform-next').hide(); }
			}
		}

		layui.form.render();

		$this
			.on('click', '.layui-inline > .layui-btn', function () { search($items, 1); })
			.on('click', '.jq-dropdown-panel > .layui-btn', function (e) {
				var $td   = $(e.target).closest('td'),
				    nodes = $.fn.zTree.getZTreeObj($td.find('.ztree')[0].id).getCheckedNodes(),
				    value = '';
				if (nodes.length > 0) {
					value = nodes[0].getPath().reduce(function (res, v) {
						res.push(v.id);
						return res;
					}, []).join('.');
				}
				if ($td.data('val') != value) {
					$td.data('val', value);
					search($items, 1);
				} else {
					$td.children('div').jqDropdown('hide');
				}
			});

		layui.form
			.on('radio(jquery-searchform-radio)', function (data) {
				var $td = $(data.elem).closest('td');
				if ($td.data('val') != data.value) {
					$td.data('val', data.value);
					search($items, 1);
				}
			});

		$('body')
			.on('click', '.jquery-searchform-page .jquery-searchform-btn', function (e) {
				search($items, (parseInt($(e.target).siblings('.jquery-searchform-page input').val()) || 1));
			})
			.on('click', '.jquery-searchform-page .jquery-searchform-prev', function () {
				var page = parseInt($('.jquery-searchform-page').data('val'));
				search($items, page > 1 ? page - 1 : 1);
			})
			.on('click', '.jquery-searchform-page .jquery-searchform-next', function () {
				var page = parseInt($('.jquery-searchform-page').data('val'));
				search($items, page + 1);
			});
	};

	function search($items, page) {
		var params = [], text = null, date = null;
		$items.each(function () {
			var $item = $(this);
			if ($item.data('type') == 'input') {
				text = encodeURIComponent($item.find('input').val().trim());
			} else if ($item.data('type') == 'date') {
				date = encodeURIComponent($item.find('input').val().trim());
			} else if ($item.data('type') == 'radio') {
				params.push($item.data('val'));
			} else if ($item.data('type') == 'tree') {
				params.push($item.data('val'));
			}
		});
		params.push(page);
		if (text != null) {
			params.push(text);
		}
		if (date != null) {
			params.push(date);
		}

		//noinspection JSUnresolvedVariable
		var pathname = window.location.pathname,
		    regex    = /[^/]+_[^/]*/;
		params       = params.join('_');
		//noinspection JSCheckFunctionSignatures
		pathname        = regex.test(pathname) ? pathname.replace(regex, params) : pathname + '/' + params;
		window.location = pathname + window.location.search;
	}
})(jQuery);