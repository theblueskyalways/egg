(function ($) {
	$.fn.searchform = function (settings, dataTable, params) {
		if (!Array.isArray(settings)) {
			return;
		}
		var $this    = $(this), $table = $(dataTable);
		settings.forEach(function (v, i) {
			switch (v.type) {
			case 'checkbox':
				v.data = JSON.parse(v.data);
				if (Array.isArray(v.data)) {
					var html =
						    '<tr>' +
						    '<td class="label">' + v.label + '</td>' +
						    '<td data-type="checkbox" name="' + v.name + '">';
					if (v.default) {
						html += '<input type="checkbox" lay-skin="primary" name="jquery-searchform-checkbox-' + v.name + '" value="0" title="' + v.default + '">';
					}
					v.data.forEach(function (v1) {
						html += '<input type="checkbox" lay-skin="primary" name="jquery-searchform-checkbox-' + v.name + '" value="' + v1.id + '" title="' + v1.name + '">';
					});
					html +=
						'</td>' +
						'</tr>';
					html     = $(html);
					$this.append(html);
					if (v.data.length == 0) {
						html.hide();
					}
				}
				break;
			case 'submit':
				$this.append(
					'<tr>' +
					'<td class="label">' + v.label + '</td>' +
					'<td data-type="submit">' +
					'<div class="layui-inline">' +
					'<button class="layui-btn layui-btn-xs submit"><i class="layui-icon">&#xe615;</i>查找</button>' +
					'</td>' +
					'</tr>');
				break;
			case 'dateGroup':
				v.data = JSON.parse(v.data);
				if (Array.isArray(v.data)) {
					var html = '<tr>' +
						'<td class="label">' + v.label + '</td>' +
						'<td data-type="dateGroup">';
					if (v.default) {
						html += '<input type="radio" name="jquery-searchform-dateGroup-' + i + '" value="0" title="' + v.default + '">';
					}
					v.data.forEach(function (v) {
						html += '<input type="radio" name="jquery-searchform-dateGroup-' + i + '" value="' + v.id + '" title="' + v.name + '">';
					});
					html +=
						'<div class="layui-inline">' +
						'<input type="text" name="date" placeholder="' + v.label + '" class="layui-input" id="date">' +
						'</div>' +
						'<div class="layui-inline" style="width: auto !important;">' +
							//'<button class="layui-btn"><i class="layui-icon">&#xe615;</i>查找</button>' +
						'</div>' +
						'</td>' +
						'</tr>';
					html     = $(html);
					$this.append(html);
					if (v.data.length == 0) {
						html.hide();
					}
				}
				break;
			case 'star':
				$this.append(
					'<tr>' +
					'<td class="label">' + v.label + '</td>' +
					'<td data-type="star">' +
					'<div class="layui-inline">' +
					'<span><div id="star"></div></span>' +
					'</div>' +
					'<div class="layui-inline">' +
						//'<button class="layui-btn"><i class="layui-icon">&#xe615;</i>查找</button>' +
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
					'<input type="text" name="date" placeholder="' + v.label + '" class="layui-input" id="'+(v.id||"date")+'">' +
					'</div>' +
					'<div class="layui-inline">' +
						//'<button class="layui-btn"><i class="layui-icon">&#xe615;</i>查找</button>' +
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
					'<input type="text" name="input" placeholder="' + v.label + '" class="layui-input">' +
					'</div>' +
					'<div class="layui-inline">' +
						//'<button class="layui-btn"><i class="layui-icon">&#xe615;</i>查找</button>' +
					'</div>' +
					'</td>' +
					'</tr>');
				break;
			case 'radio':
				v.data = JSON.parse(v.data);
				if (Array.isArray(v.data)) {
					var html   =
						    '<tr>' +
						    '<td class="label">' + v.label + '</td>' +
						    '<td data-type="radio">';
					var filter = '';
					if (v.filter) {
						filter = 'jquery-searchform-radio';
					}
					if (v.default) {
						html += '<input type="radio" lay-filter="' + filter + '" name="jquery-searchform-radio-' + v.name + '" value="0" title="' + v.default + '">';
					}
					v.data.forEach(function (v1) {
						html += '<input type="radio" lay-filter="' + filter + '" name="jquery-searchform-radio-' + v.name + '" value="' + v1.id + '" title="' + v1.name + '">';
					});
					html +=
						'</td>' +
						'</tr>';
					html       = $(html);
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
						'<button class="layui-btn"><i class="layui-icon">&#xe63c;</i>确定</button>' +
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

		var $items = $this.find('td:not(.label)'), $input = [], $date = [];
		params     = params.split('_');
		$items.each(function () {
			var $item = $(this);
			if ($item.data('type') == 'input') {
				$input.push($item.find('input'));
			} else if ($item.data('type') == 'date') {
				$date.push($item.find('input'));
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
			} else if ($item.data('type') == 'checkbox') {
				if ($item.find('input').length == 0) {
					$item.closest('tr').hide();
				} else {
					//noinspection JSDuplicatedDeclaration
					value = params.shift();
					value = value.split('.');
					if (value[0]) {
						for(var i=0 ; i<value.length;i++){
							$elem = $item.data('val', value).find('input[value=' + value[i] + ']');
							if ($elem.length > 0) {
								//$elem.attr('checked', true);
								$($item.find('input[value='+value[i]+']')).attr('checked', true);
							}
						}
						//value.forEach(function (v) {
						//	console.log(v);
						//	$elem = $item.data('val', value).find('input[value=' + v + ']');
						//	if ($elem.length > 0) {
						//		//$elem.attr('checked', true);
						//		$($item.find('input')[v]).attr('checked', true);
						//	}
						//});
					}
				}
			} else if ($item.data('type') == 'tree') {
				//noinspection JSDuplicatedDeclaration
				var value = params.shift();
				$item.data('val', value);
				value     = value.split('.');
				//console.log(value);
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
			} else if ($item.data('type') == 'dateGroup') {
				var value = params.shift();
				$item.data('val', value);
				value     = value.split('.');       //value[0]:时间类型    value[1]:时间值
				//noinspection JSDuplicatedDeclaration
				$elem = $item.find('input[value=' + parseInt(value[0]) + ']');    //接口返回的radio默认值
				var $date_ = $item.find('input[name=date]');
				if ($date_.length > 0) {
					$date_.val(value[1]);
				}
				if ($elem.length > 0) {
					$elem.attr('checked', true);
				} else {
					$($item.find('input')[0]).attr('checked', true);
				}
			}
		});

        var page = 1, more = false;
		if (params.length >= 2) {
			page = parseInt(params.shift());
			more = parseInt(params.shift());
			if ($input.length) {
                $input.forEach(v => {
                    v.val(params.shift());
                });
			}
            if ($date.length) {
                $date.forEach(v => {
                	v.val(params.shift());
				});
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
				$page.css('display', 'none');
			} else {
				if (page == 1) { $('.jquery-searchform-page .jquery-searchform-prev').hide(); }
				if (!more) { $('.jquery-searchform-page .jquery-searchform-next').hide(); }
			}
		}
		layui.form.render();
		$this
			.on('click', '.layui-inline > .layui-btn', function () {
				search($items, 1);
			})
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
					//search($items, 1);
				}
				$td.children('div').jqDropdown('hide');
				var $tree = $.fn.zTree.getZTreeObj($td.find('.ztree')[0].id),
				    node  = $tree.getNodeByParam('id', value.split('.').pop());
				if (node) {
					$tree.checkNode(node, true, true, false);
					$tree.selectNode(node, false, false);
					//noinspection JSValidateTypes
					$td.children('a').text(node.getPath().reduce(function (res, v) {
						res.push(v.name);
						return res;
					}, []).join(' / '));
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
				search($items, (parseInt($(e.target).closest('.jquery-searchform-page').find('input').val()) || 1));
				//search($items, (parseInt($(e.target).siblings('.jquery-searchform-page input').val()) || 1));
			})
			.on('click', '.jquery-searchform-page .jquery-searchform-prev', function () {
				var page = parseInt($('.jquery-searchform-page').data('val'));
				search($items, page > 1 ? page - 1 : 1);
			})
			.on('click', '.jquery-searchform-page .jquery-searchform-next', function () {
				var page = parseInt($('.jquery-searchform-page').data('val'));
				search($items, page + 1);
			})
			.on('click', '.layui-btn.layui-btn-xs.submit', function (e) {
				var input = [],
				    date  = [];
				params    = '';
				$.each($('.layui-form.searchform').find('td:not(.label)'), function (v) {
					switch ($(this).data('type')) {
					case 'checkbox':
						var name     = $(this).attr('name'),
						    checkbox = [],
						    p        = [];
						$("input:checkbox[name='jquery-searchform-checkbox-" + name + "']:checked").each(function (e) {
							p.push($(this).val());
						});
						checkbox.push(p);
						if (p.length > 0) {
							checkbox.forEach(function (v) {
								v.forEach(function (v1) {
									params += v1 + '.'
								});
								params = params.substr(0, params.length - 1) + '_'
							});
						} else {
							params += '_';
						}
						break;
					case 'radio':
						var radio = [];
						name      = $(this).children().attr('name');
						p         = [];
						$("input:radio[name='" + name + "']:checked").each(function (e) {
							p.push($(this).val())
						});
						radio.push(p);
						if (p.length > 0) {
							radio.forEach(function (v) {
								params += v[0] + '_';
							});
						} else {
							params += '_';
						}
						break;
					case 'input':
						input.push($(this).find('input').val());
						break;
					case 'date':
						date.push($(this).find('input').val());
						break;
					case 'dateGroup':
						params += $(this).find('input[type="radio"]:checked').val() + '.';
						params += $(this).find('input[type="text"]').val() + '_';
						break;
					case 'star':
						break;
					case 'tree':
						params += $(this).data('val') + '_';
						break;
					}
				});
				// params += $page.data('val') + '_';
                params += '1_';
				input.forEach(function (v) {
					params += v + '_';
				});
				date.forEach(function (v) {
					params += v + '_';
				});
				params    = params.substr(0, params.length - 1);
				//noinspection JSUnresolvedVariable
				var pathname = window.location.pathname,
				    regex    = /[^/]+_[^/]*/;
				//noinspection JSCheckFunctionSignatures
				pathname        = regex.test(pathname) ? pathname.replace(regex, params) : pathname + '/' + params;
				window.location = pathname + window.location.search;
			})
	};
	function search($items, page) {
		var params = [], text = [], date = [], dateGroup = null;
		$items.each(function () {
			var $item = $(this);
			if ($item.data('type') == 'input') {
				text.push(encodeURIComponent($item.find('input').val().trim()) );
			} else if ($item.data('type') == 'date') {
				date.push(encodeURIComponent($item.find('input').val().trim()) );
			} else if ($item.data('type') == 'radio') {
				params.push($item.data('val'));
			} else if ($item.data('type') == 'tree') {
				params.push($item.data('val'));
			} else if ($item.data('type') == 'dateGroup') {
				params.push($item.find('input[type=radio]:checked').val() + '.' + $item.find('input[name=date]').val());
			} else if ($item.data('type') == 'checkbox') {
				params.push($item.data('val').join('.'));
			}
		});

		params.push(page);
		if (text.length) {
			text.forEach(v=>{
                params.push(v);
			});
		}
		if (date.length) {
			date.forEach(v=>{
                params.push(v);
            });
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